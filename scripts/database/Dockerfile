# Use the official SQL Server 2019 image as the base
FROM mcr.microsoft.com/mssql/server:2019-latest

# Set environment variables for SQL Server
ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=YourStrongPassword123

# Create a directory for SQL scripts
WORKDIR /usr/src/sql-scripts

# Copy SQL scripts into the container
COPY dbo.TimeSlotStatus.Table.sql .
COPY dbo.Timeslot.Table.sql .
COPY dbo.User.Table.sql .
COPY dbo.Customer.Table.sql .
COPY dbo.Engineer.Table.sql .
COPY dbo.Job.Table.sql .
COPY dbo.ModelTimeslot.Table.sql .
COPY dbo.Order.Table.sql .

COPY dbo.PurchasedTimeSlots.UserDefinedTableType.sql .

COPY dbo.ReportQuery.StoredProcedure.sql .
COPY dbo.ShowOrder.StoredProcedure.sql .
COPY dbo.GetAvailableTimeSlotsForEngineer.StoredProcedure.sql .
COPY dbo.DeleteOrder.StoredProcedure.sql .
COPY dbo.CreateOrder.StoredProcedure.sql .

COPY InitialDataPopulate.sql .

# Start SQL Server and execute the scripts
RUN /opt/mssql/bin/sqlservr & sleep 10 \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P YourStrongPassword123 -Q "CREATE DATABASE PiBooking" \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P YourStrongPassword123 -d PiBooking -i dbo.TimeSlotStatus.Table.sql \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P YourStrongPassword123 -d PiBooking -i dbo.User.Table.sql \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P YourStrongPassword123 -d PiBooking -i dbo.Customer.Table.sql \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P YourStrongPassword123 -d PiBooking -i dbo.Engineer.Table.sql \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P YourStrongPassword123 -d PiBooking -i dbo.Job.Table.sql \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P YourStrongPassword123 -d PiBooking -i dbo.ModelTimeslot.Table.sql \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P YourStrongPassword123 -d PiBooking -i dbo.Order.Table.sql \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P YourStrongPassword123 -d PiBooking -i dbo.Timeslot.Table.sql \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P YourStrongPassword123 -d PiBooking -i dbo.PurchasedTimeSlots.UserDefinedTableType.sql \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P YourStrongPassword123 -d PiBooking -i dbo.ReportQuery.StoredProcedure.sql \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P YourStrongPassword123 -d PiBooking -i dbo.ShowOrder.StoredProcedure.sql \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P YourStrongPassword123 -d PiBooking -i dbo.GetAvailableTimeSlotsForEngineer.StoredProcedure.sql \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P YourStrongPassword123 -d PiBooking -i dbo.DeleteOrder.StoredProcedure.sql \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P YourStrongPassword123 -d PiBooking -i dbo.CreateOrder.StoredProcedure.sql \
    && /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P YourStrongPassword123 -d PiBooking -i InitialDataPopulate.sql

# Expose SQL Server port
EXPOSE 1433


# Start SQL Server when the container runs
CMD ["/opt/mssql/bin/sqlservr"]
