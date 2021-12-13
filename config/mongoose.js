const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI ||"mongodb://localhost/connect_userdb" );

const db = mongoose.connection;

db.on("err",(err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log("Successfully connected to Database")
})

module.exports = db;