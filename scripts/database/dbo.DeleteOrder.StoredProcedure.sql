 
GO
/****** Object:  StoredProcedure [dbo].[DeleteOrder]    Script Date: 9/30/2019 10:17:23 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



/* 
 
 execute Delete 2 
 */
  
CREATE PROCEDURE [dbo].[DeleteOrder]
@OrderID int 

--TODO: determine best solution when rates differ due to data update or compromised input
--maybe report?

AS
SET XACT_ABORT ON
SET NOCOUNT ON
BEGIN 
 
    begin transaction

		Delete dbo.Timeslot  from dbo.Timeslot T
		where T.OrderID = @OrderID

		Delete dbo.[Order]  from dbo.[Order]  O
		where O.OrderID = @OrderID
	

		select @OrderID;
 
    commit transaction
END

GO
