//board.js
const express = require('express');
const path = require('path');
const router = express.Router();
const Board = require('../models/Board')

router.get('/list',(req,res)=>{
    //res.sendFile(path.join(__dirname,'../public', 'list.html'));
    // handlebars 뷰 엔진으로 응답처리
    res.render('board/list', {title: '게시판'});
});
router.get('/write',(req,res)=>{
    //res.sendFile(path.join(__dirname,'../public', 'write.html'));
    res.render('board/write', {title: '새글쓰기'});
});

router.post('/write',async (req,res)=>{
   let viewName = '/board/failWrite';
    let {title, uid, contents} = req.body;

    let rowcnt = new Board(null, title, uid,
        null, contents, null).insert().then((result)=>result);
    if (await rowcnt > 0) viewName = '/board/list';


    res.redirect(303, viewName);
});

router.get('/view',(req,res)=>{
    //res.sendFile(path.join(__dirname,'../public', 'view.html'));
    res.render('board/view', {title: '게시판본문보기'});
});


router.get('/delete',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public', 'delete.html'));
});
router.get('/update',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public', 'update.html'));
});


module.exports = router;