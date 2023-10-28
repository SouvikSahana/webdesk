const express=require("express")
const multer=require("multer")
const fs=require("node:fs")
const sharp=require("sharp")
const {userLogin,Item}=require("./database")

const router=express.Router()
const upload=multer({
    fileFilter(req, file,cb){
        cb(undefined, true  )
    }
})

router.post("/signin",async (req,res)=>{
    try{
        const token=await userLogin(req.body.username,req.body.password)
        res.json(token)
    }catch(error){
        res.json({message: error.message})
    }
})

router.post("/additem",upload.array('images',10),async(req,res)=>{
    try {
    const images = req.files;
    const imageFile = await Promise.all(images.map(async (image, index) => {
        const buffer = await sharp(image.buffer)
            .resize({ width: 250, height: 250 })
            .toBuffer();
        return { image: buffer };
    }));

    const item = new Item({
        ...req.body,
        images: imageFile
    });
    const response=await item.save()
    res.redirect("/")
    }catch(error){
        res.redirect("/additem")
    }
})
router.get("/getitems",async(req,res)=>{
    const items=await Item.find({},{projection:{images:0}})
    for(let i=0;i<items.length;i++){
        items[i].images=await items[i].images[0]
    }
    // console.log(items)
    res.send(items)
})
router.get("/deleteitem/:id",async(req,res)=>{
    try{
        const id=req.params.id
        const response= await Item.findByIdAndDelete(id)
        res.json(response)
    }catch(error){
        res.json({message: error.message})
    }
})
module.exports=router