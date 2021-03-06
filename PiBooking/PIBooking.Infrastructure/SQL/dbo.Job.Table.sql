 
GO
/****** Object:  Table [dbo].[Job]    Script Date: 9/30/2019 10:17:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Job](
	[JobID] [int] IDENTITY(1,1) NOT NULL,
	[CustomerID] [int] NOT NULL,
	[JobName] [varchar](128) NOT NULL,
	[JobDescription] [varchar](max) NOT NULL,
	[UpdateDate] [datetime] NULL,
	[CreateDate] [datetime] NULL,
 CONSTRAINT [PK_Job_1] PRIMARY KEY CLUSTERED 
(
	[JobID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Job]  WITH NOCHECK ADD  CONSTRAINT [FK_Job_Customer] FOREIGN KEY([CustomerID])
REFERENCES [dbo].[Customer] ([CustomerID])
GO
ALTER TABLE [dbo].[Job] CHECK CONSTRAINT [FK_Job_Customer]
GO
