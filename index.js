const cors=require("cors");
const express=require("express");
const path=require("path");
const {open}=require("sqlite");
const sqlite3=require("sqlite3");
const index=express();
index.use(cors());
index.use(express.json());
let db=null;

const dbPath=path.join(__dirname,"users.db");


initiate=async()=>{
    try{
        db=await open({
            filename:dbPath,
            driver:sqlite3.Database
        })
        index.listen(4000,()=>{
            console.log("server Runnning at 4000 port")
        })
    }
    catch(e){
        console.log(`DB error:${e.message}`);
        process.exit(1);
    }
}


initiate();

index.get("/get",async(request,response)=>{
    const que=`
    select * from lead
    `;
    const data=await db.all(que);
    console.log(data);
    response.send(data);
})