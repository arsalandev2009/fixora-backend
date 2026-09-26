import mongoose from 'mongoose'
// let isConnected = false
export async function ConnectDB(){

        mongoose.connect(process.env.MONGODB_URL)

    
    .then(()=>{console.log('MongoDB Connected')}).then((err)=>{console.log(err)})
}