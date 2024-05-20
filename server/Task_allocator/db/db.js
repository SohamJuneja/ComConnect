import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL = `mongodb+srv://${username}:${password}@cluster0.pihemkg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    try {
        await mongoose.connect(URL);
        console.log('Database Connected Successfully');
    } catch(error) {
        console.log('Error: ', error.message);
    }
};

export default Connection;