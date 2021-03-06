 
GO
/****** Object:  StoredProcedure [dbo].[ShowOrder]    Script Date: 9/30/2019 10:17:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
--ShowOrder @OrderID= 3031
Create procedure [dbo].[ShowOrder]
@OrderID int
as

SELECT *
  FROM  [dbo].[Order] O
	inner join [dbo].[Job] J on O.JobID=J.JobID
	inner join [dbo].[Customer] C on J.CustomerID=C.CustomerID
	inner join [dbo].[Timeslot] TS on O.OrderID=TS.OrderID
	inner join [dbo].[Engineer] E on TS.EngineerID= E.EngineerID
Where O.OrderID = @OrderID
GO
