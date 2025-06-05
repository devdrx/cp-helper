const express = require('express');
const cors = require('cors');
const { connectDB } = require('./connection');
const mongouri = process.env.MONGO_URI 
const app = express();
const PORT = process.env.PORT || 5000;

const userRouter = require('./routers/user');
const postRouter = require('./routers/posts');
// const atcoderRouter = require('./routers/atcoder');
// const dotenv = require('dotenv');

app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
    }
))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB(mongouri);

app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
// app.use('/api/atcoder-contests', atcoderRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
