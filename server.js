//to use express
const express = require("express");
const app= express()

//imported middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//using mongoose to access mongoDB
const mongoose = require("mongoose");

//for cors
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
   });

   
//created a mongoose Schema and model
var SignupSchema = new mongoose.Schema( {fname:String,lname:String,company:String,job:String,email: {type:String,unique:true},phone:String, }, 
     { versionKey: false } );

var SignupModel = mongoose.model("contacts", SignupSchema,"contacts");
//here 2nd contacts is the name of collection(or table)

app.post("/register", function(req, res) {
    mongoose.connect("mongodb://localhost/googlecontacts", {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true});
    // here googlecontacts is the name of database

    var newsignup = new SignupModel( {fname:req.body.fname, lname:req.body.lname, company:req.body.company, job:req.body.job, email:req.body.email, phone:req.body.phone} );

    newsignup.save(function(err,data) {
      if (err)
      {
        console.log(err);
        res.send("Email Already Exists, try with new one!");
      }
      else
      {
        res.send("Thanks for registering with us ")
      }
      mongoose.connection.close();
    });
  });
  

  app.get("/fetchcontacts", function(req, res) {
    mongoose.connect("mongodb://localhost/googlecontacts", {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true});
    console.log(req.query);
    
    SignupModel.find(function(err, data)
    {
      if (err)
      {
        console.log(err);
        res.send(err);
      }
      else
      {
        console.log(data);
        res.send(data);
      }
      mongoose.connection.close();
    });
  });


app.delete("/delcontact", function(req, res) {
  mongoose.connect("mongodb://localhost/googlecontacts", {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true});
  console.log(req.query);

  SignupModel.remove({ _id: req.query.uid }, function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send(data);
      
    }
    mongoose.connection.close();
  });
});

app.put("/updatelist", function(req, res) {
  mongoose.connect("mongodb://localhost/googlecontacts", {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true});
  console.log(req.body);

  SignupModel.update({ _id:req.body.userid}, {$set: {fname:req.body.fname, lname:req.body.lname, company:req.body.company,job:req.body.job,email:req.body.email,phone:req.body.phone}} ,function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send("Failed");
    }
    else
    {
      console.log(data);
      res.send(data);
      
    }
    mongoose.connection.close();
  });
});

app.get("/searchuser", function(req, res) {
  mongoose.connect("mongodb://localhost/googlecontacts", {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true});
  console.log(req.query);

  //.find({username : req.query.queryvaraible})
  SignupModel.find({ _id:req.query.userid}, function(err, data)
  {
    if (err)
    {
      console.log(err);
      res.send(err);
    }
    else
    {
      console.log(data);
      res.send(data);
     
    }
    mongoose.connection.close();
  });
});

//server starts listening
app.listen(3000,()=>{
    console.log("Server is running at port number 3000")
}); 

app.get("/",(req,res)=>{
  res.send("Welcome to Node Js")
})

