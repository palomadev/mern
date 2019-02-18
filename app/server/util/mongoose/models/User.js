module.exports = (Schema) => {
    return new Schema({
        name: String,
        role: Number,
        email: String,
        password: String,
        datetime: { type: Date, default: Date.now }
    });
};