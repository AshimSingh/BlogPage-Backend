const Tags = require('../models/tags')
const {successResponse} = require('../helper/response')
const {errorResponse} = require('../helper/response')
const {validateCreateTags,validateUpdateTags,validateDeleteTags} = require('../middleware/validator/tagsValidation')
const {slugChecker,slugCreator} = require('../helper/slugCreator')

const getTags =async(req,res,next)=>{
    //call validation
    try{
        const tags = await Tags.find().lean()
        if(!tags?.length){
            errorResponse(res,200,"No tags")
        }else{
            successResponse(res,200,"tags",Tags)
        }
            
    }
    catch(err){
        next(err)
    }
}

const createTags = async(req,res,next)=>{
    try{
        // const value = await validateCreateTags(req.body)
        console.log(req.body)
        const {title,description,slug}= req.body
        //if slug is not provided then
    if(slug == null || slug == undefined){
        slug= await slugCreator(title,Blog)
        console.log("slug from controller",slug)
        if(slug == true){
          return errorResponse(res,400,"somethig went wrong generating slug")
        }
      }else{
        //if slug is provided must check slug
        //  await sendEmail()
        const slugExist= await slugChecker(slug,Blog)
        if(slugExist){
          return errorResponse(res,400,"Slug exist reenter slug")
        }
        // it returns false if slug already exists then it returns error from that function only
      }
        const newTags = await Tags.create({title,description,slug})
        if(newTags){
           return successResponse(res,200,"Tags",newTags)
        }
        else{
            errorResponse(res,204,"No tags found")
        }
    }
    catch(err){
        next(err)
    }
}
const updateTags = async(req,res,next)=>{
    try{
        const value = await validateUpdateTags(req.body)
        const{id,title,description,slug}= req.body
        //if slug is not provided then
    if(slug == null || slug == undefined){
        slug= await slugCreator(title,Blog)
        console.log("slug from controller",slug)
        if(slug == true){
          return errorResponse(res,400,"somethig went wrong generating slug")
        }
      }else{
        //if slug is provided must check slug
        //  await sendEmail()
        const slugExist= await slugChecker(slug,Blog)
        if(slugExist){
          return errorResponse(res,400,"Slug exist reenter slug")
        }
        // it returns false if slug already exists then it returns error from that function only
      }
        const tagsExist = await Tags.findById(id).exec()
        if(!tagsExist){
            errorResponse(res,204,"Tags not found")
        }
        else{
            tagsExist.title = title
            tagsExist.description = description
            tagsExist.slug = slug
            const result = await tagsExist.save()
            if(result){
                successResponse(res,200,"updated")
            }
            else{
                errorResponse(res,204,"Tags not updated")
            }
         }
    }
    catch(err){
        next(err)
    }
}
const deleteTags =async(req,res,next)=>{
    try{
        const {id} = req.body
        const tagsExist = await Tags.findById(id).exec()
        if(!tagsExist){
            errorResponse(res,204,"Medai does not exist")
        }
        else{
            const result = await Tags.deleteOne({_id:id}).lean()
            if(result){
                successResponse(res,200,"Successfully deleted category")
            }
            else{
                errorResponse(res,400,"Couldn't delete one")
            }
        }
    }
    catch(err){
        next(err)
    }
}
module.exports ={
    getTags,
    createTags,
    updateTags,
    deleteTags
}