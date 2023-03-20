import express from 'express';

import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getByUserId,
  updateBlog,
} from '../controller/blog-controller.js';

const blogRouter = express.Router();

blogRouter.get('/', getAllBlogs);
blogRouter.post('/add', addBlog);
blogRouter.put('/update/:id', updateBlog);
blogRouter.get('/:id', getBlogById);
blogRouter.delete('/:id', deleteBlog);
blogRouter.get('/user/:id', getByUserId);

export default blogRouter;
