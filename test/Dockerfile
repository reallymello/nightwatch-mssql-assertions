FROM mcr.microsoft.com/mssql/server:latest

RUN mkdir -p /opt/scripts
COPY ./test/database.sql /opt/scripts

ENV MSSQL_SA_PASSWORD=ThisIsAStrongP@assword!SortOf
ENV SA_PASSWORD=ThisIsAStrongP@assword!SortOf
ENV ACCEPT_EULA=Y

RUN /opt/mssql/bin/sqlservr --accept-eula & sleep 60  & /opt/mssql-tools/bin/sqlcmd -S localhost:1434 -U SA -P 'ThisIsAStrongP@assword!SortOf' -d master -i /opt/scripts/database.sql 