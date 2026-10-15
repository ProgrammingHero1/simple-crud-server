import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import cors from 'cors';
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 5000;

// middleware
app.use(cors())
app.use(express.json())


const client = new MongoClient(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vyznij5.mongodb.net/?appName=Cluster0`);

export async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Successfully Connected to MongoDB');
        return client;
    }
    catch (err) {
        console.dir(err);
    }
}

const connectedClient = await connectToMongoDB();
const db = connectedClient.db('simpleCrudDB');
const users = db.collection('users');

app.get('/', (req, res) => {
    res.send('Simple CRUD Server is running')
});


app.get('/users', async (req, res) => {
    const cursor = users.find({});
    const allUsers = await cursor.toArray();
    res.send(allUsers);
})

app.get('/users/:id', async (req, res) => {
    console.log('params in the server', req.params)

    const id = req.params.id;
    const query = { _id: new ObjectId(id) }

    const result = await users.findOne(query);
    res.send(result);
})

app.post('/users', async (req, res) => {
    const newUser = req.body;
    console.log('Adding new user:', newUser);

    const result = await users.insertOne(newUser);
    res.send(result);
})

app.listen(port, () => {
    console.log(`Simple CRUD Server is running on port: ${port}`)
})