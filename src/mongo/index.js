
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://hellorokastech:5tk0cE1LOBpFBjx1@cluster1.46dkjj5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function setupDatabase() {
  try {
    await client.connect();
    const db = client.db('sample_mflix');

    return {
      client,
      db,
      users: db.collection('users'),
      movies: db.collection('movies'),
      comments: db.collection('comments'),
    };
  } catch (err) {
    console.log('Error connecting to the databased');

    return {};
  }
}
