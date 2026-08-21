const express= require("express");
const fs= require('fs');
const app= express();
const PORT=3000;
app.set("view engine","ejs");

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true}));

app.get('/',(req,res)=>{
    const data= JSON.parse(fs.readFileSync('./data.json','utf-8'));
    res.render('index',{jobs: data.jobs});
})

app.listen(PORT, ()=>{
    console.log(`running server on https://localhost:${PORT}`);
})