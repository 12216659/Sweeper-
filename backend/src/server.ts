import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 8000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sweepers_dev';

// Connect to MongoDB
mongoose
    .connect(mongoUri)
    .then(() => {
        console.log('Successfully connected to MongoDB.');
        
        // Start the server
        const server = app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

        // Handle unhandled promise rejections
        process.on('unhandledRejection', (err: Error) => {
            console.log('UNHANDLED REJECTION! 💥 Shutting down...');
            console.log(err.name, err.message);
            server.close(() => {
                process.exit(1);
            });
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});
