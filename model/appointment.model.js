const mongoose=require("mongoose")

const appointmentSchema=mongoose.Schema({
    name:String,
    image:String,
    specialization:{
        type:String,
        enum:["Cardiologist", "Dermatologist", "Pediatrician","Psychiatrist" ],
        required:true
    },
    experience:Number,
    location:String,
    date:{
        type:Date,
        default:Date.now,
        required:true
    },
    slots:Number,
    fee:Number,

})

const appointmentModel=mongoose.model("appointment",appointmentSchema)

module.exports={appointmentModel}