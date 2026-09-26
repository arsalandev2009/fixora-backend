import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import dns from 'dns'
import { ConnectDB } from "./src/db/ConnectDB.js";
import { Routes } from "./src/routes/Routes.js";

dotenv.config()
dns.setServers(['1.1.1.1','8.8.8.8'])

const app = express()
const PORT = 3000


app.use(express.json())

app.use(cors())

ConnectDB()

app.use('/api',Routes)

app.listen(PORT,()=>{
    console.log(`Server Running on port ${PORT}`)
})
// export default app