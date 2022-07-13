const express = require("express");
const router = express.Router();
const {fork} = require ('child_process')

const path = process.cwd()+'/src/controllers/random.js';

router.get('/', (req,res)=>{
    let cantidad = req.query
    const forkedCalc = fork(path);
    forkedCalc.send(cantidad);

    forkedCalc.on('message', (data)=>{
       res.send({
           pid: process.pid,
           msg: data
       })
    })
})

module.exports = router;
