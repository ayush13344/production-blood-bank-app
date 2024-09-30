const express =require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');
const cors=require('cors');
const connectDb = require('./config/db');
const path=require("path");
dotenv.config();

connectDb();
const app=express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1/test',require("./routes/testRoutes"));
app.use('/api/v1/auth',require("./routes/authRoutes"));
app.use('/api/v1/inventory',require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics",require("./routes/analyticsRoutes"));
app.use("/api/v1/admin",require("./routes/adminRoutes"));

app.use(express.static(path.join(__dirname,'./client/build')));
app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'));
})



const PORT=process.envPORT ||8080;
app.listen(PORT,()=>{
    console.log(`Node server running in ${process.env.DEV_MODE} ModeOn port ${process.env.PORT}`);
});