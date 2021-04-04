const { json } = require("express");
const express = require("express");
const pool = require("../config");

const router = express.Router();

// Get comment
router.get('/:blogId/comments', function(req, res, next){
});

// Create new comment
router.post('/:blogId/comments', async function(req, res, next){
    comment = req.body.comment
    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();
    try{
        const [rows1, fields1] = await conn.query(
            'INSERT INTO `comments` (`blog_id`, `comment`, `like`, `comment_date`) VALUES (?, ?, ?, CURRENT_TIMESTAMP)', 
            [req.params.blogId, comment, 0]
        )
        const [rows2, fields2] = await conn.query(
            'SELECT * FROM `comments` WHERE `id` = ?', 
            [rows1.insertId]
        )
        await conn.commit()
        return res.json(rows2[0])
    } catch (err) {
        await conn.rollback();
        return res.status(500).json(err)
    }finally{
        console.log('finally')
        conn.release();
    }
});

// Update comment
router.put('/comments/:commentId', function(req, res, next){
    return
});

// Delete comment
router.delete('/comments/:commentId', function(req, res, next){
    return
});

// Delete comment
router.put('/comments/addlike/:commentId', function(req, res, next){
    return
});


exports.router = router