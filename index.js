const Joi = require('joi');
const express = require('express');
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

app.get('/api/courses/:id',(req,res)=>{
    let course = courses.find(e=>e.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('The course does not exist');
    res.send(course);
});

app.post('/api/courses',(req,res)=>{

    const {error} = validateCourse(req.body)    
    if(error) return res.status(400).send(errors.details[0].message);
    
    let course={
        id:courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})

app.put('/api/courses/:id',(req,res)=>{

    let course = courses.find(e=>e.id === parseInt(req.params.id));
    if(!course) return res.status(404).send('Course not found!!');

    const {error} = validateCourse(req.body)    
    if(error) return res.status(400).send(errors.details[0].message);

    course.name = req.body.name;
    res.send(course)
});

app.delete('/api/courses/:id',(req,res)=>{
    // Look for the course
    const course = courses.find(e=> e.id===parseInt(req.params.id));
    console.log(course)
    if(!course) return res.status(404).send('Course not found');

    // Delete the course
    let index = courses.indexOf(course);
    console.log(index)
    courses.splice(index,1);

    res.send(courses);
});


function validateCourse(course) {
    const schema= Joi.object({
        name: Joi.string().required().min(3)
    });
    return schema.validate(course);
}

// PORT
const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
});
