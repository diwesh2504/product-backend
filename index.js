const express=require('express');
const app=express();
const mongodb=require('mongodb');
const bodyParser=require('body-parser');
const cors=require('cors');
//const url="mongodb://localhost:27017";
const url=process.env.DB;

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
            password:req.body.password
        });
        client.close(); 

    }catch(err){
        console.log(err);
    }

})
//Login



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
    try{
        let client=await mongodb.connect(url);
        let db=client.db("products");
        db.collection("items").insertOne({
            _id:req.body.id,
            name:req.body.name,
            price:req.body.price,
            stock:req.body.stock
        });
        client.close(); 

    }catch(err){
        console.log(err);
    }

})
//Update Item Stock



//Listening
app.listen(process.env.PORT||4040,()=>{
    console.log("listening");
})