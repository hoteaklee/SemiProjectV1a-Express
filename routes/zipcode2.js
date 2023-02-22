const express = require('express');
const router = express.Router();
const Zipcode = require('../models/Zipcode');

router.get('/', async (req,res)=>{
    res.render('zipcode2', {title: ' 시구군동 찾기 v2'});
});

router.get('/sido', async (req,res)=>{

    let sidos = new Zipcode().getSido().then(sido =>sido);

    res.send(JSON.stringify( await sidos));    // 조회결과를 JSON형식으로 전송
});

router.get('/gugun/:sido', async (req,res)=>{
        let sido = req.params.sido;
    let guguns = new Zipcode().getGugun(sido).then(gugun =>gugun);

    res.send(JSON.stringify( await guguns));    // 조회결과를 JSON형식으로 전송
});

module.exports = router;