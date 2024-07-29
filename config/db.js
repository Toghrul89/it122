import mongoose from 'mongoose';

const connectionString = "mongodb+srv://tjaffarov:sUkPG5IkmAvmV35m@cluster0.drlyzrq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const connectDB = async () => {
  try {
    await mongoose.connect(connectionString, {
      dbName: 'dbuser',
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

