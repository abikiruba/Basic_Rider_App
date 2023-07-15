const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { default: mongoose } = require("mongoose");


const app = express();

//MongoDB configuration
mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected successfully.');
}).catch((err) => {
    console.log(err);
});

//middleware
app.use(express.json());
app.use(cors());

//routes
app.use('/api/v1', require('./routes/riderRoute'))

//server Listening
const port = process.env.PORT||4000;
app.listen(port,()=>console.log(`Listening on port ${port}...`));
