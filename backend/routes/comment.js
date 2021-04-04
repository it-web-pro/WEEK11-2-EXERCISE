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
    try{
        const [rows, fields] = await pool.query(
            'INSERT INTO `comments` (`blog_id`, `comment`, `like`, `comment_date`) VALUES (?, ?, ?, CURRENT_TIMESTAMP)', 
            [req.params.blogId, comment, 0]
        )
        return res.json({messageId: rows.insertId})
    } catch (err) {
        return res.status(500).json(err)
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