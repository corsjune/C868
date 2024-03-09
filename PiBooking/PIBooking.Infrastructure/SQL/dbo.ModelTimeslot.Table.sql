 
GO
/****** Object:  Table [dbo].[ModelTimeslot]    Script Date: 9/30/2019 10:17:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ModelTimeslot](
	[ModelTimeSlotId] [int] IDENTITY(1,1) NOT NULL,
	[BeginDateTime] [time](3) NOT NULL,
	[EndDateTime] [time](3) NOT NULL,
	[UpdateDate] [datetime] NULL,
	[CreateDate] [datetime] NULL
) ON [PRIMARY]
GO
