const pageInitionHelper = (req) => {
  let page = Number(req.query.page) || 1
  let limit = Number(req.query.limit) || 3
  let sortBy = req.query.sortby || '_id'
  let sortOrder = Number(req.query.sortorder) || -1
  let skip = (page - 1) * limit
  let sort = {
    sortBy,
    sortOrder,
  }
  return { page, limit, sort, skip }
}
module.exports = { pageInitionHelper }
