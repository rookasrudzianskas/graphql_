
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://hellorokastech:5tk0cE1LOBpFBjx1@cluster1.46dkjj5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function setupDatabase() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    return {
      client,
    }
  } catch (e) {
    console.error(e);
  }
}
setupDatabase().catch(console.dir);
