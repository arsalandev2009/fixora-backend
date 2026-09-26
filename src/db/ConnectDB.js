import mongoose from 'mongoose'
let isConnected = false
export async function ConnectDB(){
    try{
        mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
    }catch(error){
        console.error('Error connecting to db:'.error)
    }
    
    // .then(()=>{console.log('MongoDB Connected')}).then((err)=>{console.log(err)})
}