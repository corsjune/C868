 
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 9/30/2019 10:17:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[CustomerID] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [varchar](50) NOT NULL,
	[LastName] [varchar](50) NOT NULL,
	[Company] [varchar](50) NULL,
	[CompanyTitle] [varchar](50) NULL,
	[Address] [varchar](50) NOT NULL,
	[City] [varchar](50) NOT NULL,
	[State] [varchar](50) NOT NULL,
	[ZipCode] [varchar](10) NOT NULL,
	[Phone] [varchar](25) NOT NULL,
	[Email] [varchar](128) NOT NULL,
	[UpdateDate] [datetime] NULL,
	[CreateDate] [datetime] NULL,
 CONSTRAINT [PK_Customer_1] PRIMARY KEY CLUSTERED 
(
	[CustomerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
