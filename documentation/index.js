const basicinfo = require('./basicinfo')
const servers = require('./servers')
const tags = require('./tags')
const components = require('./component')
const path = require('./path')

//our index has basic info server tags and components and working components are in api
//every folder has index js
module.exports = {
  ...basicinfo,
  ...servers,
  ...tags,
  ...components,
  ...path,
}
