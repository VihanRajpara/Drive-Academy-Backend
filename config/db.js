const mongoose =require('mongoose')
const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log('\x1b[36m%s\x1b[0m',`MongoDB Connected : ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
    }
}
module.exports = connectDB