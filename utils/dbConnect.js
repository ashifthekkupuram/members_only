const mongoose = require('mongoose')

const dbConnect = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('DB Connected')
    }catch(error){
        console.error(error)
    }
}

dbConnect()