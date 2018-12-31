let express = require('express');
const router = express.Router();
const Autor = require('../model/models/Autor');

router.get('/', (req, res) => {
  Autor.find()
  .then(autor => res.status(200).json({autor}));
});

 router.get('/:id', (req, res) => {
   const idAutor = req.params.id
   Autor.findById(idAutor)
     .then((autor) => {
       res.status(200).json({
         autor
       })
     }).catch((erro) => {res.status(406).json({message: '406 Not Acceptable', erro})});
 });

router.post('/', (req, res) => {
  const autor = new Autor({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  autor.save()
    .then(result => res.status(201).json({result}))
    .catch((erro) => res.status(406).json({message: '406 Not Acceptable', erro}));
});

module.exports = router;