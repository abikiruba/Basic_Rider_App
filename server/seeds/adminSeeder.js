// seeds/adminSeeder.js

const mongoose = require("mongoose");
const User = require("../models/userModel");

mongoose.connect("mongodb+srv://Hubert:hubert2001@cluster0.6ubkzec.mongodb.net/RiderApp?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected successfully.");
}).catch((err) => {
  console.log(err);
});

const adminUser = new User({
  name: "Admin",
  email: "admin@gmail.com",
  password: "12345678",
  role: "admin"
});

adminUser.save()
  .then(() => {
    console.log("Admin seeded successfully");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error seeding admin:", err);
    mongoose.connection.close();
  });
