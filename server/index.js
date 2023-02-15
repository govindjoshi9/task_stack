const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const nodemailer = require('nodemailer')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/demo');


const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    methods: ['POST'],
    credentials: true
}))

// Collection Schema
const formSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please check your data entry, no name specified']
    },
    dob: {
        type: String,
        required: [true, 'Please check your data entry, no dob specified']
    },
    email: {
        type: String,
        required: [true, 'Please check your data entry, no email specified']
    },
    phoneNum: {
        type: Number,
        required: [true, 'Please check your data entry, no number specified']
    },
})

// Collection Model
const Form = mongoose.model('form', formSchema)


app.get('/', function(req, res){
    res.status(200).send("Hello world!")
})

app.post('/save-data', function(req, res){
    
    const firstName = req.body.name
    const dob = req.body.dob
    const email = req.body.email
    const phoneNum = req.body.phone

    //Save to data in DB
    const formData = Form({
        firstName : firstName,
        dob : dob,
        email : email,
        phoneNum : phoneNum,
    })

    formData.save(function(error){
        if(error){
            console.log(error)
            //In case of error, send to client
            res.status(500)
        }else{
            console.log('Form data saved')
        }
    })

    
    //Send confirmation email after data is saved to DB
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mornilucifer177@gmail.com',
            pass: "Govind@#$123"
        }
    });

    const mailOptions = {
        form: 'mornilucifer177@gmail.com',
        to: email,
        subject: 'StackFusion User-Form Confirmation',
        text: `Form data submited :

            First Name: ${firstName},
            Email: ${email},
            Phone Number: ${phoneNum},
            DoB: ${dob}
        `
    };

    transporter.sendMail(mailOptions, function(err, info){
        
        if(err){
            console.log(err);
        }else{
            console.log(info);
            console.log("Successfully submitted form.");
        }
    });

    res.status(200).json({message : "Form data saved and confirmation email sent."})
})

// Read all forms
app.get('/read-forms', function(req, res){

    Form.find(function(error, foundForms){
        if(error){
            console.log(error)
            res.status(500)
        }else{
            console.log(foundForms)
            res.status(200).send(foundForms)
        }
    })
})


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3001;
}

app.listen(port, function(){
    console.log(`Server up and running on PORT : ${port}`)
})