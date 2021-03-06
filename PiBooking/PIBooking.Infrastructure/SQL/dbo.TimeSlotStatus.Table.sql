 
GO
/****** Object:  Table [dbo].[TimeSlotStatus]    Script Date: 9/30/2019 10:17:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TimeSlotStatus](
	[TimeSlotStatusID] [int] NOT NULL,
	[TimeSlotName] [varchar](50) NOT NULL,
	[UpdateDate] [datetime] NULL,
	[CreateDate] [datetime] NULL,
 CONSTRAINT [PK_TimeSlotStatus] PRIMARY KEY CLUSTERED 
(
	[TimeSlotStatusID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
