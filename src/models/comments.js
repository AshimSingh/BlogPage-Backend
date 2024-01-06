const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Comment', commentSchema)
