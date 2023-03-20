import express from 'express';
import mongoose from 'mongoose';

import blogRouter from './routers/blog-router.js';
import router from './routers/user-router.js';

const app = express();

app.use(express.json());

app.use('/api/user', router);
app.use('/api/blog', blogRouter);

mongoose
  .connect(
    'mongodb+srv://adnan:GBM6JU6PhHfmp2Lh@cluster0.3iwpoay.mongodb.net/BlogApp?retryWrites=true&w=majority'
  )
  .then(() => app.listen(3000))
  .then(() => console.log('Connected to database successfully ...'))
  .catch((error) => console.log(error));
