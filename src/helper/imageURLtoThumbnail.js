const mediaHelper = require('./mediaUrlHelper')

// const imageUrlAddertoThumbnail =async(req,data)=>{
//     var thumbnails_data = []
//     for(var j=0;j<data?.thumbnail?.thumbnails?.length;j++){
//       var url = await mediaHelper(req, data?.thumbnail?.thumbnails[j].path)
//       thumbnails_data.push({...data.thumbnail.thumbnails[j]._doc,image_url:url})
//     }
//     data.thumbnail.thumbnails=thumbnails_data
//   return data
// }

const imageUrlAddertoThumbnail = async (req, data) => {
  var thumbnails_data = []
  for (var j = 0; j < data?.length; j++) {
    var url = await mediaHelper(req, data[j]?.path)
    thumbnails_data.push({ ...data[j]?._doc, image_url: url })
  }
  // data.thumbnail.thumbnails=thumbnails_data
  return thumbnails_data
}
module.exports = imageUrlAddertoThumbnail
