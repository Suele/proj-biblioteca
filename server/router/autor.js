let express = require('express');
const router = express.Router();
const Autor = require('../model/models/Autor');

router.get('/', (req, res) => {
  res.json({
    message: 'rota autor'
  });
});

router.post('/', (req, res) => {
  const autor = new Autor({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  autor.save()
    .then(result => res.json({result}))
    .cath(erro => res.json(erro))
});

module.exports = router;