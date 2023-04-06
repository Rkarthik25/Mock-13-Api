const express=require("express")

const appointmentRouter=express.Router()

const {appointmentModel}=require("../model/appointment.model")

appointmentRouter.post("/appointments",async(req,res)=>{
    const payload=req.body
    const post=new appointmentModel(payload)
    await post.save()
    res.send({"msg":"posts created"})
})
appointmentRouter.get("/appointments/",async(req,res)=>{
    const getData=await appointmentModel.find()
    res.send(getData)
})

appointmentRouter.get("/appointments/:category",async(req,res)=>{
    const getData=await appointmentModel.find()
    
    return res.send(getData.filter((el)=>el.specialization===req.params.category))
})
appointmentRouter.get("/appointments/name/:query",async(req,res)=>{
    const getData=await appointmentModel.find()
    
    return res.send(getData.find((el)=>el.name===req.params.query))
})
appointmentRouter.get("/appointments/page/:page",async(req,res)=>{
    const getData=await appointmentModel.find()
    const limit=4
        res.send(getData.splice((limit*req.params.page)-limit,limit*req.params.page))
})
appointmentRouter.patch("/appointments/",async(req,res)=>{
    const getData=await appointmentModel.find()
    const limit=4
        res.send(getData.splice((limit*req.params.page)-limit,limit*req.params.page))
})

module.exports={appointmentRouter}