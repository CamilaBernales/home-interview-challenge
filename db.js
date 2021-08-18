const mongoose = require('mongoose')

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DB_MONGO || 'mongodb://localhost:27017/digiventures-app', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });
      console.log("db connected.");
    } catch (error) {
      console.log('An error ocurred', error);
      process.exit(1);
    }
};
  
module.exports = connectDB;