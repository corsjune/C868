 
GO
/****** Object:  StoredProcedure [dbo].[ReportQuery]    Script Date: 9/30/2019 10:17:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--ReportQuery 
--ReportQuery @SearchBeginDate='2019-09-25 15:00:00.000', @SearchEndDate='2019-09-25 16:00:00.000'
--ReportQuery @HasPaid=1
CREATE procedure [dbo].[ReportQuery]
@HasPaid int = null,
@SearchBeginDate datetime= null,
@SearchEndDate datetime= null
as

;With BaseQuery as
(
SELECT 
	O.OrderID,
	C.FirstName + ' ' +  C.LastName  CustomerName,
	Coalesce(C.Company, '(NONE)') Company,
	J.JobName Job,
	( 
		Select top 1 E.FirstName + ' ' +  E.LastName 
		from [dbo].[Timeslot] T 
			inner join [dbo].[Engineer] E on T.EngineerID = E.EngineerID
		where T.OrderID = O.OrderID 
	)  Engineer,
	(	Select min(BeginDateTime) 
		from [dbo].[Timeslot] T
		where T.OrderID = O.OrderID
	) FirstTimeSlot,
	(	Select max(BeginDateTime) 
		from [dbo].[Timeslot] T
		where T.OrderID = O.OrderID
	) LastTimeSlot, 
	O.Total Total,
	O.HasPaid HasPaid
  FROM  [dbo].[Order] O
	inner join [dbo].[Job] J on O.JobID=J.JobID
	inner join [dbo].[Customer] C on J.CustomerID=C.CustomerID 
 
)
Select *
from  BaseQuery
Where 
	(HasPaid=@HasPaid or @HasPaid is null)   
	--based on stack overflow answer on intersecting date ranges 
	--https://stackoverflow.com/questions/325933/determine-whether-two-date-ranges-overlap
	And (( (@SearchBeginDate <= LastTimeSlot)  and  (@SearchEndDate >= FirstTimeSlot)) or @SearchBeginDate is null or  @SearchEndDate is null)

 
GO
