const deleteMedia = require('./deleteMedia')
const getAllMedia = require('./getAllMedia')
const getMedia = require('./getMedia')
const postMedia = require('./postMedia')
const searchMedia = require('./searchMedia')
const updateMedia = require('./updateMedia')

module.exports = {
  '/media/': {
    ...getAllMedia,
    ...postMedia,
  },
  '/media/?': {
    ...searchMedia,
  },
  '/media/{mediaId}': {
    ...getMedia,
    ...updateMedia,
    ...deleteMedia,
  },
}
