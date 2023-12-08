const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://janstovr:fooBar83@cluster0.3dwqjjw.mongodb.net/review_app?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("db is connected");
  })
  .catch((err) => {
    console.log("db connection failed: ", err);
  });
