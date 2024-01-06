const postMedia = {
  postMedia: {
    value: {
      title: 'Sample Image',
      caption: 'A sample image',
      description: 'This is a sample image',
      alt: 'Sample Alt Text',
      path: '',
      type: 'image',
      thumbnails: [],
    },
  },
}

const updateMedia = {
  updateMedia: {
    value: {
      title: 'Updated Image',
      caption: 'An updated image',
      description: 'This image has been updated',
      alt: 'Updated Alt Text',
      path: '',
      type: 'image',
      thumbnails: [],
    },
  },
}

const deleteMedia = {
  deleteMedia: {
    value: {},
  },
}

module.exports = {
  ...postMedia,
  ...updateMedia,
  ...deleteMedia,
}
