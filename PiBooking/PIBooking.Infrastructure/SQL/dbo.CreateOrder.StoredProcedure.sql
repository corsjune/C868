 
GO
/****** Object:  StoredProcedure [dbo].[CreateOrder]    Script Date: 9/30/2019 10:17:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



/*
-- Create the data type
CREATE TYPE dbo.PurchasedTimeSlots 
AS TABLE(
	[TimeslotID] [int],
	[EngineerID] [int] NOT NULL,
	[BeginDateTime] [datetime] NOT NULL,
	[EndDateTime] [datetime] NOT NULL,
	[Rate] [decimal](18, 3) NULL,
	[Status] [int] NOT NULL,
	[OrderID] [int] NULL,
	[UpdateDate] [datetime] NULL,
	[CreateDate] [datetime] NULL
 ) 
 */
 /*
 
DECLARE @TimeSlots dbo.PurchasedTimeSlots
  
  INSERT INTO @TimeSlots
           ([EngineerID]
           ,[BeginDateTime]
           ,[EndDateTime]
           ,[Rate]
           ,[Status]
           ,[OrderID] )
     VALUES
           (2
           ,'2019-09-25 08:00:00.000'
           ,'2019-09-25 15:00:00.000'
           ,50
           ,1
           ,null )

INSERT INTO @TimeSlots
           ([EngineerID]
           ,[BeginDateTime]
           ,[EndDateTime]
           ,[Rate]
           ,[Status]
           ,[OrderID] )
     VALUES
           (2
           ,'2019-09-25 16:00:00.000'
           ,'2019-09-25 16:00:00.000'
           ,50
           ,1
           ,null )
 
 execute CreateOrder 2,  null, @TimeSlots 
 */
  
CREATE PROCEDURE [dbo].[CreateOrder]
@JobId int,
@Signature varchar(MAX),
@TimeSlots dbo.PurchasedTimeSlots READONLY

--TODO: determine best solution when rates differ due to data update or compromised input
--maybe report?

AS
SET XACT_ABORT ON
SET NOCOUNT ON
BEGIN

	declare @PurchasedStatus int 
	declare @StartRange DateTime
	declare @EndRange DateTime
	declare @EngineerID int 

	select	@StartRange =  Min(BeginDateTime),
			@EndRange= Max(BeginDateTime),
			@EngineerID =Min(EngineerID) 
	from @TimeSlots


	select @PurchasedStatus= TimeSlotStatusID --should always be 3.. but define as such for readibility
	from [dbo].[TimeSlotStatus]
	where TimeSlotName = 'Purchased'
	 
	CREATE TABLE #AvailableForEngineer( 
		[EngineerID] [int] NOT NULL,
		[BeginDateTime] [datetime] NOT NULL,
		[EndDateTime] [datetime] NOT NULL,
		[Rate] [decimal](18, 3) NULL,
		[Status] [int] NOT NULL 
	 )
	 --wrap in transaction
	 BEGIN TRANSACTION 

		INSERT INTO #AvailableForEngineer
		Exec [dbo].[getAvailableTimeSlotsForEngineer] @EngineerID, @StartRange, @EndRange

		declare @EXceptionDate DateTime

		--only move forward if the passed in dates are in status 1 'Available'
		Select @ExceptionDate = TS.BeginDateTime
		from #AvailableForEngineer AE
			right join @TimeSlots TS on AE.BeginDateTime = TS.BeginDateTime and AE.EngineerID = TS.EngineerID  and  Ae.Status=1   
		where AE.BeginDateTime is null

		--throw error if ts not available  
		If (@ExceptionDate is not null)
		BEGIN
				Rollback Transaction;
				THROW 52000,'Dates requested are no longer available.',1 ;
		END

 
		--cretae job
		Insert into dbo.[Order](JobId, HasPaid, Signature, CreateDate, UpdateDate)
		Values (@JobId, 0, @Signature, getDate(), getDate());

		declare @OrderID int 
		Set @OrderID = SCOPE_IDENTITY()  
		--create timeslots

	 
		MERGE dbo.TimeSlot cur USING @TimeSlots new 
		ON (cur.EngineerID = new.EngineerID and cur.BeginDateTime = new.BeginDateTime)
		WHEN MATCHED
			THEN 
				Update Set cur.Status = @PurchasedStatus,
				cur.OrderID = @OrderID,
				cur.UpdateDate = getDate()
		WHEN NOT MATCHED
			THEN  
				INSERT  ([EngineerID]
						   ,[BeginDateTime]
						   ,[EndDateTime]
						   ,[Rate]
						   ,[Status]
						   ,[OrderID]
						   ,[UpdateDate]
						   ,[CreateDate])
				VALUES
					(	new.EngineerID,
						new.BeginDateTime,
						new.EndDateTime,
						new.Rate,
					    @PurchasedStatus,
						@OrderID,
						getDate(),
						getDate()
					);

		--update total
		Update dbo.[Order]
		Set Total = (select Coalesce(Sum(Rate),0) from [dbo].[Timeslot] TS where Ts.OrderID= @OrderID)
		from dbo.[Order] O
		where O.OrderID = @OrderID

		select @OrderID;
 
    commit transaction
END

GO
