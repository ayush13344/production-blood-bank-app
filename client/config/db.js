const mongoose =require('mongoose');
const connectDb=async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected To mongodb database ${mongoose.connection.host}`)
    }catch(error){
        console.log(`Mongodb Database Error ${error}`)
    }
}
module.exports=connectDb