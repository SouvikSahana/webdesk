const express=require("express")
const router=require("./routes")

const app=express()
const port=process.env.PORT || 5000
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/login",express.static("./public/login"))
app.use("/additem",express.static("./public/addItem"))
app.use("/adminpage",express.static("./public/adminpage"))

app.use(router)
app.listen(port,()=>{
    console.log("Running Server")
})