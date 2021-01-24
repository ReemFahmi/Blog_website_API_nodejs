const Blog = require('../models/Blog');

const create = (blog) => Blog.create(blog);

const editOne = (id, body) => Blog.findByIdAndUpdate(id, body, { new: true }).exec();

const getAll = () => Blog.find({}).exec();

const getAlluserblogs = (query) => Blog.find(query).exec();

const getById = (id) => Blog.findById(id).exec();

// const deleteone=(id) => Blog.findOneAndDelete(id).exec();
//const deleteone=(id) => Blog.findByIdAndDelete(id,{ new: true }).exec();
const deleteone =(id)=>Blog.remove({_id:id});

const getblog =(_tag)=>Blog.find({tags:{$elemMatch:{tag:_tag}}}).exec();

const getauther =(_ather)=>Blog.find({auther:_ather}).exec();
const gettitle =(_title)=>Blog.find({title:_title}).exec();


module.exports = {

  create,
  editOne,
  getAll,
  getById,
  deleteone,
  getAlluserblogs,
  getblog,
  getauther,
  gettitle,
};
