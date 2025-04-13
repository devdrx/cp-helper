const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { connectDB } = require('./connection');
const mongouri = process.env.MONGO_URI 
const app = express();
const PORT = process.env.PORT || 5000;

const userRouter = require('./routers/user');
// const dotenv = require('dotenv');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB(mongouri);

app.use('/api/users', userRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
