import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())


const client = new MongoClient(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vyznij5.mongodb.net/?appName=Cluster0`);

export async function connectToMongoDB() {
    try{
        await client.connect();
        console.log('Successfully Connected to MongoDB');
        return client;
    }
    catch(err){
        console.dir(err);
    }
}

await connectToMongoDB();

app.get('/', (req, res) =>{
    res.send('Simple CRUD Server is running')
});

app.listen(port, () =>{
    console.log(`Simple CRUD Server is running on port: ${port}`)
})