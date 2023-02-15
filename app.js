const express = require("express");
const bodyParser = require("body-parser");
const studentRoutes = require("./api/routes/students");
const facultyRoutes = require("./api/routes/faculties");
const app = express();

//Middleware
app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());

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