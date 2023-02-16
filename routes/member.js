const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/join',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public', 'join.html'));
});

router.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public', 'login.html'));
});

router.get('/myinfo',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public', 'myinfo.html'));
});

module.exports = router;