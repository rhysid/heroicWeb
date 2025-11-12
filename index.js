const express = require('express');
const axios = require('axios');
const app = express()

app.get('/', async(req,res)=>{
    res.send(`<title>Heroic Coming Soon</title><p>Heroic Coming Soon</p>`)
})
app.listen(80, console.log("Server on 80"))