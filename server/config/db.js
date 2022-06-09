const mongoose=require('mongoose');

const connectDB=async () => {
    try{
      await mongoose.connect(process.env.MONGO_URI,{
          useNewUrlParser: true,
      });
      console.log("database connected");
    }
    catch(err){
      console.log(err.message);
      //exit process with failure
      process.exit(1);
    }
}

module.exports =connectDB;