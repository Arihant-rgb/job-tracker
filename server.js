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

app.post('/jobs',(req,res)=>{
    const data= JSON.parse(fs.readFileSync('./data.json','utf-8'));

    const newJob = {
        id: Date.now(),
        company: req.body.company,
        role: req.body.role,
        status: req.body.status
    };

    data.jobs.push(newJob);

    fs.writeFileSync('./data.json',JSON.stringify(data,null,2));

    res.redirect('/');
});

app.post("/jobs/:id/delete",(req,res)=>{

    let data= JSON.parse(fs.readFileSync('./data.json','utf-8'));

    const jobId= Number(req.params.id);

    data.jobs = data.jobs.filter(job => job.id != jobId);

    fs.writeFileSync('./data.json',JSON.stringify(data,null,2));

    res.redirect('/');
})

app.listen(PORT, ()=>{
    console.log(`running server on https://localhost:${PORT}`);
})