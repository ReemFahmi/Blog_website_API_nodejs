const express = require('express');
const {
  create,
  getAll,
  getById,
  editOne,
  deleteone,
  getAlluserblogs,
  getblog,
  getauther,
  gettitle
} = require('../controllers/blog');
const authMiddleware = require('../middleware/auth');
const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
   // debugger;
    const blog = await getAll();
    res.json(blog);
  } catch (e) {
    next(e);
  }
});

router.use(authMiddleware);


router.post('/createblog', async (req, res, next) => {
  const { body,user: { id }  } = req;
  try {
     // debugger
    const blog = await create({...body, auther: id});
    res.json(blog);
  } catch (e) {
    next(e);
  }
});

// to give his blogs (token)
router.get('/', async (req, res, next) => {
  const { user: { id } } = req;
  try {
    const blog = await getAlluserblogs({ auther: id });
    res.json(blog);
  } catch (e) {
    next(e);
  }
});


router.get('/tags/:tag', async (req, res, next) => {
  const {params:{tag}} =req ;
  try {
   // debugger;
    const blogs = await getblog(tag);
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});


router.get('/auther/:auther', async (req, res, next) => {
  const {params:{auther}} =req ;
  try {
   // debugger;
    const blogs = await getauther(auther);
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});


router.get('/title/:title', async (req, res, next) => {
  const {params:{title}} =req ;
  try {
   // debugger;
    const blogs = await gettitle(title);
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});



//serch by id
router.get('/:id', async (req, res, next) => {
  // debugger;
   const { params: { id } } = req;
   try {
     const blog = await getById(id);
     res.json(blog);
   } catch (e) {
     next(e);
   }
 });

router.patch('/:id', async (req, res, next) => {
  const { params: { id }, body } = req;
 // debugger;
  try {
    const blog = await editOne(id, body);
    res.json(blog);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id',async (req, res, next) => {
  const { params: { id } } = req;
  try {
    const blogs = await deleteone(id);
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});



module.exports = router;
