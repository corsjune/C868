 
GO
/****** Object:  Table [dbo].[Engineer]    Script Date: 9/30/2019 10:17:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Engineer](
	[EngineerID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[Phone] [varchar](50) NOT NULL,
	[Email] [varchar](50) NOT NULL,
	[EmployeeID] [int] NOT NULL,
	[Rate] [decimal](18, 2) NULL,
	[AvailableStartDate] [date] NULL,
	[AvailableEndDate] [date] NULL,
	[WorkDayBeginTime] [time](3) NULL,
	[WorkDayEndTime] [time](3) NULL,
	[UpdateDate] [datetime] NULL,
	[CreateDate] [datetime] NULL,
 CONSTRAINT [PK_Engineer_1] PRIMARY KEY CLUSTERED 
(
	[EngineerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
