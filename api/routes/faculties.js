const router = require('express').Router();
const {default: mongoose} = require('mongoose');
const Faculty = require('../models/faculties')

router.get('/', (req, res, next) => {
  Faculty.find().exec()
      .then(docs => {
        if (docs.length >= 1) {
          res.status(200).json(docs);
        } else {
          res.status(404).json({
            message: '404 - Record Not Found'
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      });
});

router.get('/:id', (req, res, next) => {
  Faculty.findById(req.params.id).exec()
      .then(doc => {
        if (doc !== null) {
          res.status(200).json(doc);
        } else {
          res.status(404).json({
            message: '404 - Record Not Found'
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      });
});

router.post('/', (req, res, next) => {
  const faculty = new Faculty({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    age: req.body.age,
    grade: req.body.age
  });
  faculty.save()
      .then(doc => {
        res.status(201).json(doc);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      });
});

router.patch('/:id', (req, res, next) => {
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Faculty.findByIdAndUpdate(req.params.id, updateOps).exec()
      .then(doc => {
        res.status(200).json(doc);
      }).catch(err => {
        res.status(500).json({
          error: err
        })
      });
});

router.delete('/:id', (req, res, next) => {
  Faculty.findByIdAndDelete(req.params.id).exec()
      .then(doc => {
        res.status(200).json(doc);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        })
      });
});


module.exports = router;