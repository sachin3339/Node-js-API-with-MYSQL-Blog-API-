const validator = require('fastest-validator');
const models = require('../models');

// API to Create Post
function save(req,res){

    //This Object will fetch data and containsa exactly same attributes as post model
    const post={
        title:req.body.title,
        content:req.body.content,
        imageurl:req.body.imageurl,
        categoryId:req.body.categoryId, 
        userId: 1
    }

    const schema={
        title:{type:"string", optional:false, max:"100"},
        content:{type:"string", optional:false, max:"500"},
        categoryId:{type:"number", optional:false}
    }
    const v = new validator();
    const validationResponse= v.validate(post, schema);
    if(validationResponse!=true)
    {
        return res.status(400).json({
            message:"Validation failed",
            errors: validationResponse
        })
    }

models.Post.create(post).then(result=>{
 res.status(201).json({
     message:"Post Created Successfully",
     post:result
 });
}).catch(error=>{

    res.status(500).json({
        message:"Something went wrong",
        error:error
    });

});
}


//API to show the post by ID
function show(req,res){
 const id = req.params.id;

 models.Post.findByPk(id)
 .then(result=>{
    res.status(200).json(result);
 })
 .catch(error=>{
res.status(500).json({
    message:"something went wrong!"
})
 })

}


//Api to get all posts
function all(req,res)
{
    models.Post.findAll()
    .then(result=>{
        res.status(200).json(result);
    })
    
    .catch(error=>{
        res.status(500).json(
            {
                message:"something went wrong!"
            }
        )
    })
}

//Api to update the post
function update(req,res)
{
    const id = req.params.id;
    const updatedpost={
        title:req.body.title,
        content:req.body.content,
        imageurl:req.body.imageurl,
        categoryId:req.body.categoryId, 
    }
   const userId= 1;

   const schema={
    title:{type:"string", optional:false, max:"100"},
    content:{type:"string", optional:false, max:"500"},
    categoryId:{type:"number", optional:false}
}
const v = new validator();
const validationResponse= v.validate(up, schema);
if(validationResponse!=true)
{
    return res.status(400).json({
        message:"Validation failed",
        errors: validationResponse
    })
}
   
   models.Post.update(updatedpost,{where:{id:id, userId:userId}})
   
   .then(
       result=>{ 
           res.status(200).json({
               message:"Post updated successfully",
               post:updatedpost
           });
       }
   )
   
   .catch(error=>{
    res.status(500).json({
        message:"something went wrong!",
        error:error
    })
     })

}

//Api to delete the post
function destroy(req,res)
{
    const id = req.params.id;
    const userId=1;
    models.Post.destroy({where:{id:id, userId:userId}})
    .then(
        result=>{ 
            res.status(200).json({
                message:"Post Deleted successfully"
            });
        }
    )
    
    .catch(error=>{
     res.status(500).json({
         message:"something went wrong!",
         error:error
     })
      })   
}

module.exports={
    save:save,
    show:show,
    all:all,
    update:update,
    destroy:destroy
}