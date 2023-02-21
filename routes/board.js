//board.js
const express = require('express');
const path = require('path');
const router = express.Router();
const Board = require('../models/Board')

router.get('/list',async (req, res) => {
    let bds = new Board().select().then((bds) => bds);

    //console.log(await bds);

    // handlebars 뷰 엔진으로 응답처리
    res.render('board/list', {title: '게시판 목록', bds: await bds});
});


router.get('/write',(req,res)=>{
    if(!req.session.userid){
        res.redirect(303,'/member/login');
    } else {
        res.render('board/write', {title: '게시판 새글쓰기'});
    }
});

router.post('/write',async (req,res)=>{
   let viewName = '/board/failWrite';
    let {title, uid, contents} = req.body;

    let rowcnt = new Board(null, title, uid,
        null, contents, null).insert().then((result)=>result);
    if (await rowcnt > 0) viewName = '/board/list';


    res.redirect(303, viewName);
});

router.get('/view',async (req,res)=>{
    let bno = req.query.bno;

    let bds = new Board().selectOne(bno).then((bds)=>bds);

    res.render('board/view', {title: '게시판 본문보기', bds:await bds});
});




router.get('/delete',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public', 'delete.html'));
});
router.get('/update',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public', 'update.html'));
});


module.exports = router;