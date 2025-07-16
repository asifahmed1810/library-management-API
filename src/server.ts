import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';

let server: Server;

const PORT = 5000;

async function main() {
    try {
        await mongoose.connect('mongodb+srv://library:yZ5ehBPYL4Lo0FHT@cluster1.bhwpr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1');
        console.log("Connected to MongoDB using Mongoose");

        server = app.listen(PORT, () => {
            console.log(`Application is running on PORT- ${PORT}`);
        });

    } catch (error) {
        console.log("The error is", error);
    }
}
main();
