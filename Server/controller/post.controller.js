const models = require('../models')

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


module.exports={
    save:save,
    show:show,
    all:all
}