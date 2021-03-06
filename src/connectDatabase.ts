import mongoose from 'mongoose';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

export async function connectDatabase(host: string, port: string, database: string) {
  try {
    await mongoose.connect(`mongodb://${host}:${port}/${database}`, options);
    console.log(`Database connection successful on ${host}:${port}/${database}`);
  } catch (error) {
    throw error;
  }
}