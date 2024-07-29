import mongoose from 'mongoose';

const connectionString = "mongodb+srv://<dbuser>:<dbpassword>@<cluster>.mongodb.net/test?retryWrites=true";

export const connectDB = async () => {
  try {
    await mongoose.connect(connectionString, {
      dbName: 'tjaffarov',
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
