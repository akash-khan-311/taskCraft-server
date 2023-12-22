const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.pnvzqzb.mongodb.net/?retryWrites=true&w=majority`;
const port = process.env.port || 3000;



app.use(
    cors({
      origin: ["http://localhost:5173", "http://localhost:5174"],
      credentials: true,
      optionsSuccessStatus: 200,
    })
  );
  
  app.use(express.json());




// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
      


    const database = client.db('todoTask')
    const userTaskCollection = database.collection('userTask')


 
// Create Task
app.post('/tasks', async (req, res) => {
    const tasks = req.body;
    const result = await userTaskCollection.insertOne(tasks);
    res.send(result);
})

// Get All Task from Database
app.get('/allTasks', async (req,res)=> {
    const result = await userTaskCollection.find().toArray();
    res.send(result)
})














  // Send a ping to confirm a successful connection
  await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get("/", (req, res) => {
  res.send("server is running ");
});

app.listen(port, () => {
  console.log("port is running", port);
});
