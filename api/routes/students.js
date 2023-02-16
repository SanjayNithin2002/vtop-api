const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const Student = require("../models/students");

router.get("/", (req, res, next) => {
    Student.find().exec()
        .then(docs => {
            res.status(200).json(docs);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.get("/:id", (req, res, next) => {
    Student.findById(req.params.id).exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.post("/", (req, res, next) => {
    const student = new Student({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        class: req.body.class
    });
    student.save()
        .then(doc => {
            res.status(201).json(doc);
        });
});

router.patch("/:id", (req, res, next) => {
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    };
    Student.findByIdAndUpdate(req.params.id, updateOps).exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.delete("/:id", (req, res, next) => {
    Student.findByIdAndDelete(req.params.id).exec()
        .then(doc => {
            res.status(200).json(doc)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});


module.exports = router;