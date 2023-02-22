const oracledb = require('./Oracle');

let zipcodesql = {
    sidosql:'select distinct SIDO from ZIPCODE2013 order by sido ',
    gugunsql:'select distinct gugun from ZIPCODE2013 where sido = :1 order by gugun ',
    dongsql:'select distinct dong from ZIPCODE2013 where sido = :1 and gugun = :2 order by dong ',
    zipsql:' select * from ZIPCODE2013 ' +
        ' where sido = :1 and GUGUN = :2 and dong = :3 order by zipcode '
}

class Zipcode {
    constructor() { //생성자
    }

    async getSido() {
        let conn = null;
        let params = [];
        let sidos = [];

        try {
            conn = await oracledb.makeConn();
            let result = await conn.execute(zipcodesql.sidosql, params, oracledb.options);
            let rs = result.resultSet;

            let row = null;
            while ((row = await rs.getRow())){
                let sido = {'sido': row.SIDO};
                sidos.push(sido);
            }
        } catch (e) {
            console.log(e);
        } finally {
            await oracledb.closeConn();
        }
        return sidos;
    }; //getSido

    async getGugun(sido) {
        let conn = null;
        let params = [sido];
        // /*let params = ['서울'];*/
        let guguns = [];

        try {
            conn = await oracledb.makeConn();
            let result = await conn.execute(zipcodesql.gugunsql, params, oracledb.options);
            let rs = result.resultSet;

            let row = null;
            while ((row = await rs.getRow())){
                let gugun = {'gugun': row.GUGUN};
                guguns.push(gugun);
            }
        } catch (e) {
            console.log(e);
        } finally {
            await oracledb.closeConn();
        }
        return guguns;
    };

    async getDong(sido, gugun) {
        let conn = null;
        let params = [sido, gugun];
        let dongs = [];

        try {
            conn = await oracledb.makeConn();
            let result = await conn.execute(zipcodesql.dongsql, params, oracledb.options);
            let rs = result.resultSet;

            let row = null;
            while ((row = await rs.getRow())){
                let dong = {'dong': row.DONG};
                dongs.push(dong);
            }
        } catch (e) {
            console.log(e);
        } finally {
            await oracledb.closeConn();
        }
        return dongs;
    };

    async getZipcode() {
        let conn = null;
        let params = [];
        let zipcodes = [];

        try {
            conn = await oracledb.makeConn();
        } catch (e) {
            console.log(e);
        } finally {
            await oracledb.closeConn();
        }
        return zipcodes;
    };


};

module.exports = Zipcode;