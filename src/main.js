require('dotenv').config()
const express = require('express');
const userRouter = require('./routes/user.route');
const todosRouter = require('./routes/todos.route');
require('./middlewares/passport')

const app = express();
const PORT = process.env.PORT || 5000// 5000

app.use(express.json());
app.use('/user', userRouter);
app.use('/user', todosRouter);

app.listen(PORT, () => {
    console.log(`Server running di port ${PORT}`)
})

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })