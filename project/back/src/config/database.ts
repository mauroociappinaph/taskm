import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmate';
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};
