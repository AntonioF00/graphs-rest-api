// Importing necessary modules and libraries
import express      from 'express';
import http         from 'http';
import bodyParser   from 'body-parser';
import cookieParser from 'cookie-parser';
import compression  from 'compression';
import cors         from 'cors';

import router from './router';

// Creating an instance of the Express application
const app = express();
// Configuring Cross-Origin Resource Sharing (CORS) middleware
app.use(cors({
    credentials: true,
}));
// Applying compression middleware for response compression
app.use(compression());
// Parsing incoming JSON requests
app.use(bodyParser.json());
// Parsing cookies in incoming requests
app.use(cookieParser());
// Creating an HTTP server using the Express application
const server = http.createServer(app);

// Starting the server on port 8080
server.listen(8080, () => {
    try {
        console.log('Server running on http://localhost:8080/');
    } catch {
        console.log('Server error...');
    }
});

// Creating an instance of the MongoDB client
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://aflorio45:pozQXYhk3TtCohpf@cluster0.713mrm8.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with options including the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
// Connecting to MongoDB and handling connection status
async function run() {
    try {
        // Connect the client to the server
        await client.connect();
        // Ping the server to check the connection
        await client.db("admin").command({ ping: 1 });
        console.log("Connected to MongoDB!");
    } catch (error) {
        if (error instanceof Error) {
            // Handling connection error
            console.error(error.message);
            console.log('Connection to MongoDB error...');
        }
    } finally {
        // Closing the MongoDB connection
        await client.close();
    }
}
// Running the connection function
run().catch(console.dir);

app.use('/', router());