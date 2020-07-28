const express=require('express');
const app=express();
const mongodb=require('mongodb');
const bodyParser=require('body-parser');
const cors=require('cors');
const dotEnv=require('dotenv').config();
const url="mongodb://localhost:27017";
//const url=process.env.DB;

//MiddleWare
app.use(bodyParser());
app.use(cors());
//Register
app.post('/register',async (req,res)=>{
    try{
        let client=await mongodb.connect(url);
        let db=client.db("products");
        db.collection("users").insertOne({
            email:req.body.email,
            password:req.body.password,
            name:req.body.name
        });
        res.send("User Created!");
        client.close(); 

    }catch(err){
        console.log(err);
    }

})
//Login
app.get('/users/:email', async(req,res)=>{
    try{
        let client=await mongodb.connect(url);
        let db=client.db("products");
        let data=await db.collection("users").findOne({email:req.params.email});
        res.send(data); 


    }catch(err){
        console.log(err);
    }
})



//Product Listing
app.get('/getitems', async(req,res)=>{
    try{
        let client=await mongodb.connect(url);
        let db=client.db("products");
        let data=await db.collection("items").find().toArray();
        res.send(data);

    }catch(err){ 
        console.log(err);
    }
})




//Enter Products Name,Price,Stock
app.post('/additem',async (req,res)=>{
    console.log(req.body);
    try{
        let client=await mongodb.connect(url);
        let db=client.db("products");
        db.collection("items").insertOne({
            _id:req.body.id,
            name:req.body.name,
            price:req.body.price,
            quantity:req.body.quantity,
            inStock:req.body.inStock
        });
        res.send("Product Added!")
        client.close(); 

    }catch(err){
        console.log(err);
    }

})
//Update Item Stock
app.get('/update/:id',async (req,res)=>{
    console.log("q=",req.params.id);
    try{
        let client=await mongodb.connect(url);
        let db=client.db("products");
        let data=await db.collection("items").findOneAndUpdate({_id:req.params.id},{$inc:{"quantity":-1}});
        res.send(data.value)
        client.close(); 

    }catch(err){
        console.log(err);
    }

})


//Listening
app.listen(process.env.PORT||4040,()=>{
    console.log("listening");
})