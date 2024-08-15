const jwt = require("jsonwebtoken");

const generateAuthToken = (data) => {
    const token = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: "1 day" });

    return token;
};

module.exports = generateAuthToken;
