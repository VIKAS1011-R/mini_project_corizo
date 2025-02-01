const express = require('express');
const body_parser = require('body-parser');
const mongoose = require('mongoose');
const student = require('./models/student');

const app = express();
const port = 3000;

const connect_string = "mongodb://localhost:27017/corizo"
mongoose.connect(connect_string);

app.set('view engine', 'ejs');
app.use(body_parser.urlencoded({extended: true}));

app.get('/', async(req, res) => {
    const students = await student.find();
    res.render('index',{students});
});

app.post('/save', async(req, res) => {
    const {rollNo, name, degree, city} = req.body;
    const students = new student({
        rollNo: rollNo,
        name: name,
        degree: degree,
        city: city
    });
    students.save().then(() => {
        console.log('Student saved successfully');
    }).catch((err) => {
        console.log(err);
    });
    res.redirect('/');
});

app.get('/edit/:rollNo', async(req, res) => {
    const rollNo = req.params.rollNo;
    const studentData = await student.findOne({ rollNo: rollNo });
    const id = studentData._id;
    res.render('edit', { student: studentData, id: studentData._id });
});

app.post('/edit/:id', async(req, res) => {
    const id = req.params.id; // Extract id from request parameters
    const {rollNo, name, degree, city } = req.body;
    console.log(rollNo,name, degree, city);
    await student.updateOne({ _id: id }, {rollNo:rollNo, name: name, degree: degree, city: city });
    res.redirect('/');
});

app.get('/delete/:rollNo', async(req, res) => {
    const rollNo = req.params.rollNo;
    await student.deleteOne({ rollNo: rollNo });
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

