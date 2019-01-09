let express = require('express');
const router = express.Router();
const Autor = require('../model/models/Autor');

router.get('/', (req, res) => {
  Autor.find()
    .then((autor) => {
      if (autor.length > 0) {
        res.status(200).json({ autor });
      } else {
        res.json({
          message: 'nenhum autor registrado.'
        });
      }
    }).catch(() => {
      res.status(404).json({
        message: 'not date in Autor.'
      });
    });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Autor.remove({
    _id: id
  })
    .then(resultado => { res.status(200).json(resultado) })
    .catch(() => {
      res.json({
        message: `${id}, não encontrado.`
      })
    });
});

router.get('/:id', (req, res) => {
  const idAutor = req.params.id
  Autor.findById(idAutor)
    .then((autor) => {
      if (autor) {
        res.status(200).json({
          autor
        })
      } else {
        res.status(404).json({
          mensagem: 'O id inserido não foi encontrado.'
        });
      }
    }).catch((erro) => {
      res.status(406).json({
        message: '406 Not Acceptable',
        erro
      })
    });
});

router.post('/', (req, res) => {
  const autor = new Autor({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  autor.save()
    .then(autor => res.status(201).json({
      autor
    }))
    .catch((erro) => res.status(406).json({
      message: '406 Not Acceptable',
      erro
    }));
});

router.patch('/:id', (req, res) => {
  const id = req.params.id
  console.log(id);
  const updateOps = {};
  console.log('updateOps', updateOps);
  console.log('req.body: ' , req.body);
  for (const bodyRequest of req.body) {
    updateOps[bodyRequest.propName] = bodyRequest.newValue

    console.log('bodyRequest: ', bodyRequest);
    console.log('[bodyRequest.propName]: ', bodyRequest.propName);
    console.log('bodyRequest.newValue: ',bodyRequest.newValue);
    console.log('updateOps', updateOps);
    console.log('updateOps[bodyRequest.propName] = bodyRequest.newValue: ', updateOps[bodyRequest.propName] = bodyRequest.newValue);
    console.log('req.body: ' , req.body);
    console.log('-------------------');
  }
  Autor.update({ _id: id }, { $set: updateOps })
    .then((result) => {
      res.status(200).json({
        result
      });
    }).catch(() => {
      res.status(400).json({
        message: `Não foi possível atualizar os dados do id: ${id}.`
      });
    });
});

module.exports = router;