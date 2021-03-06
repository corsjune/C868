 
GO
/****** Object:  Table [dbo].[Timeslot]    Script Date: 9/30/2019 10:17:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Timeslot](
	[TimeslotID] [int] IDENTITY(1,1) NOT NULL,
	[EngineerID] [int] NOT NULL,
	[BeginDateTime] [datetime] NOT NULL,
	[EndDateTime] [datetime] NOT NULL,
	[Rate] [decimal](18, 3) NULL,
	[Status] [int] NOT NULL,
	[OrderID] [int] NULL,
	[UpdateDate] [datetime] NULL,
	[CreateDate] [datetime] NULL,
 CONSTRAINT [PK_Timeslot_1] PRIMARY KEY CLUSTERED 
(
	[TimeslotID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Timeslot]  WITH CHECK ADD  CONSTRAINT [FK_Timeslot_Order] FOREIGN KEY([OrderID])
REFERENCES [dbo].[Order] ([OrderID])
GO
ALTER TABLE [dbo].[Timeslot] CHECK CONSTRAINT [FK_Timeslot_Order]
GO
