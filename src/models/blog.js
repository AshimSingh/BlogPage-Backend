const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    categories: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Categories',
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Media',
    },
    tags: [
      {
        type: String,
        // required: true,
      },
    ],
    slug: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: Number,
    },
    timetoRead: {
      type: String,
    },
    published: {
      type: Boolean,
    },
    // comments: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Comment',
    //   },
    // ],
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
    // ticket:Number
  },
  {
    timestamps: true,
  },
)

// blogSchema.plugin(AutoIncrement, {
//     inc_field: 'ticket',
//     id: 'ticketNums',
//     start_seq: 500
// })

module.exports = mongoose.model('Blog', blogSchema)
