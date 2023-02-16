const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/list',(req,res)=>{
    //res.sendFile(path.join(__dirname,'../public', 'list.html'));
    // handlebars 뷰 엔진으로 응답처리
    res.render('board/list', {title: '게시판'});
});
router.get('/write',(req,res)=>{
    //res.sendFile(path.join(__dirname,'../public', 'write.html'));
    res.render('board/write', {title: '새글쓰기'});
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