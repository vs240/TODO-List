const express=require("express");
const axios=require("axios");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const Todo=require("./models/todo");
const app=express();
const port=3000;
const url="mongodb://localhost:27017/myDB";
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology: true});

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",(req,res)=>{
    Todo.find()
    .then(result=>{
        res.render("index.ejs",{data: result})
        console.log(result);
    })
})
app.post("/",async (req,res)=>{
    const todo=new Todo({
        todo:req.body.todotask
    });
    await todo.save()
    .then((result)=>{
        res.redirect("/");
    })
    .catch((err) => {
        console.error("Error saving todo:", err);
        //res.status(500).send("Internal Server Error");
    });
    
})
app.post("/delete", async (req,res)=>{
    try{
    const remove=req.body.checkbox;
      await Todo.findByIdAndRemove(remove);
      res.redirect("/");
      console.log(remove);
    }
    catch(err)
    {
        console.log(err);
    }

})
app.use((err, req, res, next) => {
    console.error(err.stack);
   // res.status(500).send('Something broke!');
});
app.listen(port,()=>{
    console.log(`the server is running on ${port}`);
})
