//member.js
const express = require('express');
const path = require('path');
const Member = require('../models/Member');

const router = express.Router();

router.get('/join',(req,res)=>{
    //res.sendFile(path.join(__dirname,'../public', 'join.html'));
    res.render('join', {title: '회원가입'});
});



router.get('/login',(req,res)=>{
    //res.sendFile(path.join(__dirname,'../public', 'login.html'));
    res.render('login', {title: '로그인'});
});

router.post('/login',async (req,res)=>{
    let {uid,passwd} = req.body;
    let  viewName = '/member/loginfail';

    let isLogin = new Member().login(uid, passwd).then(result => result);

    //console.log(await isLogin);
    if (await isLogin > 0){
        viewName = '/member/myinfo';
        req.session.userid = uid; // 아이디를 세션변수로 등록
    }


    res.redirect(303, viewName);
});
router.get('/logout',(req,res)=>{
   req.session.destroy(()=>req.session);

   res.redirect(303,'/');
});

router.get('/myinfo',(req,res)=>{
    //res.sendFile(path.join(__dirname,'../public', 'myinfo.html'));
    res.render('myinfo', {title: '회원정보'});
});
router.post('/join',(req,res,next)=>{
    let {userid, passwd, name, email} = req.body;
    // console.log(userid, passwd, name, email);
   //console.log(req.body.userid, req.body.passwd, req.body.name, req.body.email);

    new Member(userid, passwd, name, email).insert();

    res.redirect(303, '/member/login');
});


module.exports = router;