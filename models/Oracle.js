//Oracle.js
const oracledb = require('oracledb');
const dbconfig = require('../dbconfig');

const Oracle = {
    options : {
        resultSet: true,
        outFormat: oracledb.OUT_FORMAT_OBJECT
    },

    initConn: () =>{
        oracledb.initOracleClient({libDir: 'C:/Java/instantclient_19_17'});
    },

    makeConn: async () => {
        try {
            return  await oracledb.getConnection(dbconfig);
        } catch (e) { console.log(e);}
    },
    closeConn: async (conn) => {
        if (conn) {
            try { await conn.close(); }
            catch (e) { console.log(e); }
        }
    }
}

module.exports = Oracle;