const express = require('express');
require('./db');
const app = express();

const userRouter = require('./routes/user');

app.use(express.json());
app.use('/api/user', userRouter);

app.listen(8000, () => {
    console.log('Listening on post 8000');
});
