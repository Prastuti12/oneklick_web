const express=require("express");
const dotenv=require("dotenv").config();
const app=express();
const router=require("./Router/router")
const cors=require("cors");

const port=465;

app.use(express.json());
app.use(router);
app.use(cors());

app.listen(port,()=>{
    console.log(`server start at port ${port}`);
})

