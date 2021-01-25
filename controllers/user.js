const jwt = require('jsonwebtoken');
//token to promis to  higher performance
const { promisify } = require('util');
const asyncSign = promisify(jwt.sign);
const User = require('../models/User');


const { getauther }  = require('../controllers/blog');

const create = (user) => User.create(user);

const getAll = () => User.find({}).exec();

const getUser =(id) => User.findById(id).exec();

const editUser = (id, body) => User.findByIdAndUpdate(id, body, { new: true }).exec();

const deleteone=(id) => User.remove({_id:id}).exec();


const addfollow =  async (id, trgetid)=>
{
  await promise.all([
  User.update(
  { "_id": trgetid },
  {
      $push: {
        fowlling: id,
        //fowllores:trgetid
      }
  }
)
,
User.update(
  { "_id": id },
  {
      $push: {
       // fowlling: id,
        fowllores:trgetid
      }
  }
)])
};


const removefollow = (id, trgetid)=> User.update(
  { "_id": trgetid },
  {
      $pull: {
        fowlling: id,
        fowllores:id
      }
  }
);

const login = async ({ username, password }) => {
  // get user from DB
  const user = await User.findOne({ username }).exec();
  if (!user) {
    throw Error('UN_AUTHENTICATED');
  } 
  // match input password with user data using bcrypt
  const isVaildPass = user.validatePassword(password);
  if (!isVaildPass) {
    throw Error('UN_AUTHENTICATED');
  }
  //return user;
  const token = await asyncSign({
    username: user.username,
    id: user.id,
  }, 'SECRET_MUST_BE_COMPLEX', { expiresIn: '1d' });
  return { ...user.toJSON(), token };
 
};



const follwerBloges = async (id) => {
  //debugger
  const follingarr= await User.findById(id)
  .populate("auther","auther")
  .select ('fowlling ')
  .exec();
 
  var arrayOfBlogs =[]
  for ( let i = 0; i < follingarr._doc.fowlling.length; i++) {
     arrayOfBlogs.push(await getauther(follingarr._doc.fowlling[i])) ;
  }
return arrayOfBlogs;
  //debugger
};


const getfollwers = async (id) => {
  //debugger
  const _follwers= await User.findById(id)
  .populate("auther","auther")
  .select ('fowllores')
  .exec();

return _follwers._doc.fowllores;
  //debugger
};

const getfollwing = async (id) => {
  //debugger
  const _follwers= await User.findById(id)
  .populate("auther","auther")
  .select ('fowlling')
  .exec();

return _follwers._doc.fowlling;
  //debugger
};


module.exports = {
  create,
  login,
  getAll,
  getUser,
  editUser,
  deleteone,
  addfollow,
  removefollow,
  follwerBloges,
  getfollwers,
  getfollwing

};