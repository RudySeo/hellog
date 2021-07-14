const mongose = require("mongoose");

const connectDB = async () => {
  const conn = await mongose.connect(process.env.MONG_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log("MONGO DB connecting");
};

module.exports = connectDB;
