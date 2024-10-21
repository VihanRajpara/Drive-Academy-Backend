const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
// const bodyParser = require('body-parser');
const connectDB = require('./config/db');
connectDB();

const app = express();

const authRouter = require('./routes/userauthRoutes');
const academyauthRouter = require('./routes/academyauthRoutes');
// Middleware
// app.use(cors());
const corsOptions = {
    origin: '/*', // Allow all origins
    credentials: true,
    optionSuccessStatus: 200,
  };
  
app.use(cors(corsOptions));
// Configure body-parser middleware
// app.use(bodyParser.json()); // Parse JSON bodies
// app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // Parse JSON bodies


app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url} \n     req body ${JSON.stringify(req.body)}`);
    next();
  });
// Test route
app.get("/", (req, res) => {
//   res.send("Hello from the backend!");
  res.status(200).json({ message: "Hello from the backend!"});
});


app.use("/auth/user", authRouter);
app.use("/auth/academy", academyauthRouter);


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
