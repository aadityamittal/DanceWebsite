const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');//not used anytime 
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});

const contactSchema=new mongoose.Schema({
    name: String,
    mobileNo:String,
    email:String,
    address:String,
    mobileNo:String,
    why:String,
    about:String
  });
const Contact = mongoose.model('Contact', contactSchema);

app.use('/static',express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views',path.join(__dirname,'views'));


app.get('/',(req,res)=>{
    const params = {'title':'Mittal\'s dance academy'};
    res.status(200).render('home.pug',params);
});

app.get('/contact',(req,res)=>{
    const params = {'title':'Mittal\'s dance academy:Contact Form'};
    res.status(200).render('contact.pug',params);
});
app.get('/about',(req,res)=>{
    const params = {'title':'Know about Mittal\'s dance academy'};
    res.status(200).render('about.pug',params);
});
app.get('/services',(req,res)=>{
    const params = {'title':'Services by Mittal\'s dance academy'};
    res.status(200).render('services.pug',params);
});
app.get('/classinfo',(req,res)=>{
    const params = {'title':'Class Info Mittal\'s dance academy'};
    res.status(200).render('classinfo.pug',params);
});
app.post('/contact',(req,res)=>{
    var myData =new Contact(req.body);
    myData.save().then(()=>{
        res.send('Item saved to the database');
    }).catch(()=> {
        res.status(400).send('Item not saved to the database');
    });
});
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`)
});