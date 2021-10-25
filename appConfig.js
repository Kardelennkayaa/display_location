var developmentDatabase = {
    postgres: {
    host: 'ec2-63-33-239-176.eu-west-1.compute.amazonaws.com',
    port: 5432,
    database: 'dfj8696f74pajm',
    user: 'ggrrndzctwuxta',
    password: '1872a3341f8d85c00db80493e8fc8508874ae0f64656b109dca53a671d1786ed'
    }
    }
    
    var connectionString = "postgres://ggrrndzctwuxta:1872a3341f8d85c00db80493e8fc8508874ae0f64656b109dca53a671d1786ed@ec2-63-33-239-176.eu-west-1.compute.amazonaws.com:5432/dfj8696f74pajm";
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
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }
    
