import e from "express"
import app from "../app/app"
import config from "../config"
import mongoose from "mongoose"




async function server() {

    const { MongoClient, ServerApiVersion } = require('mongodb');
    // const uri = "mongodb+srv://rahulrudra146_db_user:cTBVm0QOfGPu77qu@cluster0.nv1y6gd.mongodb.net/";
    const uri = "mongodb://localhost:27017/";


    console.log(uri)
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
            await client.connect();
            // Send a ping to confirm a successful connection
            await client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        } finally {
            // Ensures that the client will close when you finish/error
            // await client.close();
        }
    }
    run().catch(console.dir);

}
// async function server() {

//     try {
//         await mongoose.connect(config.DB_CLOUD as string)
//         app.listen(config.PORT, () => {
//             console.log(`Example app listening on port ${config.PORT}`)
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }

server()
