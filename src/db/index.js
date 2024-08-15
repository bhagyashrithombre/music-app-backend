const { default: mongoose } = require("mongoose");

const dbConnect = async (callback) => {
    await mongoose
        .connect(process.env.MONGODB_URI)
        .then((data) => {
            console.log("Database Connected :)");
            callback();
        })
        .catch((error) => {
            console.log("Something went wrong while connecting with database", error);
        });
};

module.exports = dbConnect;
