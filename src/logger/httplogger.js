const morgan = require("morgan")
const rfs = require("rotating-file-stream");
const path = require('path')
const fs = require('fs')

const accessLogStream = rfs.createStream("access.log", {
  size: "10M", // rotate every 10 MegaBytes written
  interval: "1d", // rotate daily
  compress: "gzip", // compress rotated files
  path: path.join(__dirname,"../..", 'Logs')
});
var httpLogger    
    if(process.env.NODE_ENV=='production'){
       httpLogger = morgan(
            ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"',
            {
                stream:accessLogStream
            }
            )      
    }else{
       httpLogger = morgan('combined', {
            skip: function (req, res) { return res.statusCode < 400 }
          })
    }


module.exports = httpLogger