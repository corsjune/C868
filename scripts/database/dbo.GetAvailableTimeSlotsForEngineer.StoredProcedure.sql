 
GO
/****** Object:  StoredProcedure [dbo].[GetAvailableTimeSlotsForEngineer]    Script Date: 9/30/2019 10:17:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--some code based on code referenced at --http://www.dbrnd.com/2015/08/list-all-dates-between-two-dates-in-sql-server/

--execute getAvailableTimeSlotsForEngineer @EngineerID= 2, @StartDateRange='2019-11-1 08:00:00.000', @EndDateRange = '2019-11-2 15:00:00.000', @ShowOnlyAvailable = 1
CREATE Procedure [dbo].[GetAvailableTimeSlotsForEngineer]
	@EngineerID int, 
	@StartDateRange DateTime,
	@EndDateRange DateTime,
	@ShowOnlyAvailable bit = true

As 

declare @AvailableStatus int

select @AvailableStatus= TimeSlotStatusID --should always be 1.. but define as such for readibility
from [dbo].[TimeSlotStatus]
where TimeSlotName = 'Available'

Create Table #alldates
(DateData Date)

;WITH DateRange(DateData) AS 
(
    SELECT @StartDateRange as DateData
    UNION ALL
    SELECT DATEADD(d,1,DateData) DateData
    FROM DateRange 
    WHERE DateData < @EndDateRange
)
insert into #alldates
SELECT DateData 
FROM DateRange 
OPTION (MAXRECURSION 0)

;With PossiblyAvailable As
(
select	 @EngineerID as EngineerID,
	 Convert(datetime, DateData)  + Convert(datetime, BeginDateTime) BeginDateTime,
	 Convert(datetime, DateData) + Convert(datetime, EndDateTime) EndDateTime,
	 E.Rate as Rate,
	 @AvailableStatus as [Status]
from #alldates
	inner join [dbo].[Engineer] E on E.EngineerID=@EngineerID and #alldates.DateData>=E.AvailableStartDate and (#alldates.DateData<=E.AvailableEndDate or E.AvailableEndDate is null)
	inner join [dbo].[ModelTimeslot] Model on Model.BeginDateTime between E.WorkDayBeginTime and  DATEADD(SECOND,-1,E.WorkDayEndTime) -- inclusive of start but not end
)
Select	Pos.EngineerID,
		Pos.BeginDateTime,
		Pos.EndDateTime,
		Coalesce(Ts.Rate,Pos.Rate) Rate,
		Coalesce(Ts.[Status], Pos.[Status]) [Status]
from PossiblyAvailable Pos
	left join [dbo].[Timeslot] Ts on Pos.BeginDateTime=Ts.BeginDateTime and Pos.EngineerID=Ts.EngineerID
where ( @ShowOnlyAvailable = 0 )  or ( @ShowOnlyAvailable = 1 and Coalesce(Ts.[Status], Pos.[Status]) = @AvailableStatus )
order by BeginDateTime
GO
