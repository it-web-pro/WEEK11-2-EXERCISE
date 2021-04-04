const express = require("express");
const path = require("path")
const pool = require("../config");

router = express.Router();

// Search blogs
router.get("/blogs", async function (req, res, next) {
  // Your code here
  const search = req.query.search
  if (search.length > 0){
    const [rows, fields] = pool.query('SELECT * FROM `blogs` WHERE `title` LIKE ? OR content LIKE ?', [search, search])
  }else{
    const [rows, fields] = pool.query('SELECT * FROM `blogs`')
  }
  return res.json(rows)
});

// Like blog that id = blogId
router.post("/blogs/addlike/:blogId", async function (req, res, next) {
  const conn = await pool.getConnection()
    // Begin transaction
  await conn.beginTransaction();

  try{
      
    let [rows, fields] = await conn.query(
      "SELECT `like` FROM `blogs` WHERE `id` = ?",
      [req.params.blogId]
    )
    let like = rows[0].like + 1

    await conn.query(
      "UPDATE `blogs` SET `like` = ? WHERE `id` = ?",
      [like, req.params.blogId])
    
    await conn.commit()
    res.json({like: like});
  }catch(err){
    await conn.rollback();
    next(err);
  }finally{
    console.log('finally')
    conn.release();
  }
});

router.post("/blogs", async function (req, res, next) {
  // Your code here
});

// Blog detail
router.get("/blogs/:id", function (req, res, next) {
  // Query data from 3 tables
  const promise1 = pool.query("SELECT * FROM blogs WHERE id=?", [req.params.id]);
  const promise2 = pool.query("SELECT * FROM comments WHERE blog_id=?", [req.params.id]);
  const promise3 = pool.query("SELECT * FROM images WHERE blog_id=?", [req.params.id])

  // Use Promise.all() to make sure that all queries are successful
  Promise.all([promise1, promise2, promise3])
    .then((results) => {
      const [blogs, blogFields] = results[0];
      const [comments, commentFields] = results[1];
      const [images, imageFields] = results[2];
      res.json({
        blog: blogs[0],
        images: images,
        comments: comments,
        error: null,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

router.put("/blogs/:id", function (req, res) {
  // Your code here
  return;
});

router.delete("/blogs/:blogId", async function (req, res, next) {
  // Your code here
  const conn = await pool.getConnection()
    // Begin transaction
  await conn.beginTransaction();

  try{
    const [rows1, fields1] = await conn.query(
      "SELECT COUNT(*) FROM `comments` WHERE `blog_id` = ?",
      [req.params.blogId]
    )
    console.log(rows1)
    
    if (rows1[0]['COUNT(*)'] > 0){
      return res.status(400).json({message: 'Cannot delete blogs with comments'})
    }

    const [rows2, fields2] = await conn.query(
        "DELETE FROM `blogs` WHERE `id` = ?",
        [req.params.blogId])
    
    if (rows2.affectedRows === 1){
      await conn.commit()
      res.json({message: 'success'});
    } else {
      throw "Cannot delete the selected blog"
    }
  }catch(err){
    await conn.rollback();
    next(err);
  }finally{
    console.log('finally')
    conn.release();
  }
});

exports.router = router;
