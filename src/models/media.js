const mongoose = require('mongoose')

const mediaSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  caption: {
    type: String,
  },
  description: {
    type: String,
  },
  alt: {
    type: String,
  },
  path: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'image',
  },
  thumbnails: [
    {
      path: {
        type: String,
      },
      name: {
        type: String,
      },
      width: {
        type: String,
      },
      height: {
        type: String,
      },
    },
  ],
})

module.exports = mongoose.model('Media', mediaSchema)
