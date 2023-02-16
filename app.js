const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const studentRoutes = require("./api/routes/students");
const facultyRoutes = require("./api/routes/faculties");
const app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(morgan("dev"));
mongoose.connect("mongodb+srv://sanjaynithin:" + process.env.MONGO_KEY + "@cluster0.kgz6ota.mongodb.net/?retryWrites=true&w=majority");

//Routes
app.use("/students", studentRoutes);
app.use("/faculties", facultyRoutes);

//Error Handling

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error : {
            message : err.message
        }
    });
});

module.exports = app;