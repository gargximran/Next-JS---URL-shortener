import mongoose from 'mongoose'

export default async function connection(){
    if(mongoose.connections[0].readyState){
        return
    }else{
        await mongoose.connect(process.env.DB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        return
    }
}