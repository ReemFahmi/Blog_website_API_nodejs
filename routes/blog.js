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
const multer = require("multer");
const path =require("path");
const authMiddleware = require('../middleware/auth');
const router = express.Router();



const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'uploads');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


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


// router.post('/createblog',upload.single("photo"), async (req, res, next) => {
//   const { body,user: { id }  } = req;
//   //debugger;
//   const _file =req.file.filename;
//   try {
//      // debugger
//     const blog = await create({...body,photo:_file, auther: id});
//     res.json(blog);
//   } catch (e) {
//     next(e);
//   }
// });

router.post('/createblog', async (req, res, next) => {
  const { body,user: { id }  } = req;
  //debugger;
 
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
