const reduceData = (initial_data)=>{
    const result =  initial_data.reduce((result,currentObj)=>{
        return{...result,...currentObj}
    },{})._doc
   return result
}
module.exports = reduceData