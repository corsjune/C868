 
GO
/****** Object:  UserDefinedTableType [dbo].[PurchasedTimeSlots]    Script Date: 9/30/2019 10:17:23 AM ******/
CREATE TYPE [dbo].[PurchasedTimeSlots] AS TABLE(
	[TimeslotID] [int] NULL,
	[EngineerID] [int] NOT NULL,
	[BeginDateTime] [datetime] NOT NULL,
	[EndDateTime] [datetime] NOT NULL,
	[Rate] [decimal](18, 3) NULL,
	[Status] [int] NOT NULL,
	[OrderID] [int] NULL,
	[UpdateDate] [datetime] NULL,
	[CreateDate] [datetime] NULL
)
GO
