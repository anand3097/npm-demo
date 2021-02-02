const express = require('express');
const { isRegExp } = require('underscore');

const app = express();

app.use(express.json());

const courses=[
    {id:1, name:'ABC'},
    {id:2, name:'PQR'},
    {id:3, name:'XYZ'},
    {id:4, name:'DEF'},
];


app.get('/',(req,res)=>{
    res.send('Hello!');
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

app.get('/api/course/:courseId',(req,res)=>{
    let course = courses.find(e=>e.id === parseInt(req.params.courseId));
    if(!course) res.status(404).send('The course does not exist')
    res.send(course);
});

app.post('/api/courses',(req,res)=>{
    console.log(req.body)
    let course={
        id:courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

// PORT
const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
});
