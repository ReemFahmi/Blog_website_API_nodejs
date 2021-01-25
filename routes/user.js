const express = require('express');
const {
  create,
  login, 
  getAll,
  getUser,
  editUser,
  deleteone,
  addfollow,
  removefollow,
  follwerBloges,
  getfollwers ,
  getfollwing
 
  
} = require('../controllers/user');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

//create new user
router.post('/register', async (req, res, next) => {
  const { body } = req;
  try {
    const user = await create(body);
    //debugger
    res.json(user);
  } catch (e) {
    next(e);
  }
});
//get user
router.get('/', async (req, res, next) => {
  try {
    const users = await getAll();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

//delete User
router.delete('/:id',async (req, res, next) => {
    const { params: { id } } = req;
    try {
      const users = await deleteone(id);
      res.json(users);
    } catch (e) {
      next(e);
    }
  });

router.post('/login', async (req, res, next) => {
  const { body } = req;
  try {
    const user = await login(body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});


router.use(authMiddleware);

//get User By other user profile
router.get('/profile/:id', async (req, res, next) => {
  //debugger;
  const { params: { id } } = req;
  try {
    const user = await getUser(id);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

//Update User
router.patch('/edite/:id', async (req, res, next) => {
  const { params: { id }, body } = req;
  //debugger;
  try {
    const user = await editUser(id, body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});
router.post('/follow/:targetid', async (req, res, next) => {
  const { params: { targetid },user: { id }  } = req;
  try {
     const users = await addfollow( targetid, id);
    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.post('/unfollow/:targetid', async (req, res, next) => {
  const { params: { targetid },user: { id }  } = req;
  try {
    const users = await removefollow( targetid, id);
    res.json(users);
  } catch (e) {
    next(e);
  }
});

router.post('/timeline', async (req, res, next) => {
  const { user: { id }  } = req;
  try {
    //console.log("eeee");
    //console.log(id);
    const blogs = await follwerBloges(id);
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});

router.get('/followers', async (req, res, next) => {
  //debugger;
  const { user: { id } } = req;
  try {
    const _follwer = await getfollwers(id);
    res.json(_follwer);
  } catch (e) {
    next(e);
  }
});

router.get('/following', async (req, res, next) => {
  //debugger;
  const { user: { id } } = req;
  try {
    const _follwing = await getfollwing(id);
    res.json(_follwing);
  } catch (e) {
    next(e);
  }
});




module.exports = router;