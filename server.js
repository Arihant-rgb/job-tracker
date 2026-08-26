const express= require("express");
const fs= require('fs');

const app= express();
const PORT=3000;
app.set("view engine","ejs");

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true}));


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

app.get("/jobs/:id/edit",(req,res)=>{

    const data= JSON.parse(fs.readFileSync('./data.json','utf-8'));

    const jobId = Number(req.params.id);

    const job= data.jobs.find(j => j.id== jobId);

    res.render('edit',{job:job});

})

app.post("/jobs/:id/update",(req,res)=>{

    const data= JSON.parse(fs.readFileSync('./data.json','utf-8'));

    const jobId= Number(req.params.id);

    const job= data.jobs.find(j => j.id==jobId);

    job.company= req.body.company;
    job.role= req.body.role;
    job.status= req.body.status;

    fs.writeFileSync('./data.json', JSON.stringify(data,null,2));

    res.redirect('/');
})

app.get('/',(req,res)=>{
    const data= JSON.parse(fs.readFileSync("./data.json",'utf-8'));

    let jobs= data.jobs;

    if(req.query.status){
        jobs= jobs.filter(job=> job.status===req.query.status);
    }

    res.render('index',{jobs});
})

app.listen(PORT, ()=>{
    console.log(`running server on https://localhost:${PORT}`);
})