var developmentDatabase = {
    postgres: {
    host: 'ec2-44-197-142-172.compute-1.amazonaws.com',
    port: 5432,
    database: 'dc8e8es3dfs8tj',
    user: 'wnoomsxmhltgdl',
    password: '444c9828fb61d52829262ee9d02ac48501f5c1b84d7884d31b973660ae8e5025'
    }
    }
    
    var connectionString = "postgres://wnoomsxmhltgdl:444c9828fb61d52829262ee9d02ac48501f5c1b84d7884d31b973660ae8e5025@ec2-44-197-142-172.compute-1.amazonaws.com:5432/dc8e8es3dfs8tj";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = true;
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5432,
    database: {
    postgres: developmentDatabase.postgres
    }
    }
    
