const express = require("express");
const router = express.Router();
//const path = require('path');

router.get('/',(req,res)=>{
    //res.sendFile(path.join(__dirname,'../public', 'index.html'));
    // handlebars 뷰 엔진으로 응답처리
    res.render('index', {title: '첫 화면'});
});


module.exports = router;