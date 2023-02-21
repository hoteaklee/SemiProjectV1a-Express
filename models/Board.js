//Board.js
const oracledb = require('../models/Oracle');

let boardsql = {
    insert: ' insert into board (bno,  title, userid, contents) ' +
        ' values (bno.nextval, :1, :2, :3) ',
    select: ' select bno, title, userid, views,' +
        ` to_char(regdate, 'YYYY-MM-DD') regdate from board order by bno desc `,

    selectOne:` select board.*, to_char(regdate, 'YYYY-MM-DD HH24:MI:SS') regdate2 from board where bno=:1 `,

    selectCount: 'select count(bno) cnt from board',

    viewOne: 'update board set views = views + 1 where bno = :1',

    update: 'update board set title = :1 , contents= :2, regdate = current_timestamp where bno = :3 ',
    /*regdate = current_timestamp where  수정한 시간으로 바꾸기*/
    delete:' delete from board where bno=:1 '
}

class Board {
    constructor(bno, title, userid, regdate, contents, views) {
        this.bno = bno;
        this.title = title;
        this.userid = userid;
        this.regdate = regdate;
        this.contents = contents;
        this.views = views;
    }

    async insert () {   //새글쓰기
        let conn = null;
        let params = [this.title, this.userid, this.contents];
        let insertcnt = 0;

        try { conn = await oracledb.makeConn(); //연결
            let result = await conn.execute(boardsql.insert, params); //실행
            await conn.commit();  // 확인
            if (result.rowsAffected > 0) insertcnt = result.rowsAffected;
        } catch (e){ console.log(e); }
        finally { await oracledb.closeConn(); }  //종료
        return insertcnt;
    }


    async select () {   // 게시판 목록출 력
        let conn = null;
        let params = [];
        let bds = []; // 결과 적용

        try { conn = await oracledb.makeConn();
            let result = await conn.execute(boardsql.selectCount, params, oracledb.options);
            let rs = result.resultSet;
            let idx = -1 , row = null;
            if ((row = await rs.getRow())) idx = row.CNT; // 총 게시글수

             result = await conn.execute(boardsql.select, params, oracledb.options);
             rs = result.resultSet;
             row = null;
            while ((row = await rs.getRow())){
                let bd = new Board(row.BNO, row.TITLE, row.USERID, row.REGDATE, null,row.VIEWS);
                bd.idx = idx--; // 글번호 칼럼
                bds.push(bd);
            }
        } catch (e){ console.log(e); }
        finally { await oracledb.closeConn(); }
        return bds;
    }


    async selectOne (bno) {     //본문 조회
        let conn = null;
        let params = [bno];
        let bds = [];

        try { conn = await oracledb.makeConn();
            let result = await conn.execute(boardsql.selectOne, params, oracledb.options);
            let rs =  result.resultSet;

            let row = null;
            while ((row = await rs.getRow())){
                let bd = new Board(row.BNO, row.TITLE, row.USERID, row.REGDATE2, row.CONTENTS, row.VIEWS);
                bds.push(bd);
            }
            await conn.execute(boardsql.viewOne, params);
            await  conn.commit();

        } catch (e){ console.log(e); }
        finally { await oracledb.closeConn(); }
        return bds;
    }





    async update () {
        let conn = null;
        let params = [this.title, this.contents, this.bno];
        let updatecnt = 0;

        try { conn = await oracledb.makeConn();
            let result = await conn.execute(boardsql.update, params);
            await conn.commit();
            if (result.rowsAffected > 0 ) updatecnt = result.rowsAffected;
        } catch (e){ console.log(e); }
        finally { await oracledb.closeConn(); }
        return updatecnt;
    }


    async delete (bno) {
        let conn = null;
        let params = [bno];
        let deletecnt = 0;

        try { conn = await oracledb.makeConn();
            let result = await conn.execute(boardsql.delete, params); //실행
            await conn.commit(); //시스템 반영
            if (result.rowsAffected > 0) deletecnt = result.rowsAffected;  // 몇개행이 지워졌는지 확인

        } catch (e){ console.log(e); }
        finally { await oracledb.closeConn(); }
        return deletecnt;
    }
}

module.exports = Board;