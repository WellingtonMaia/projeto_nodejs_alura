const atendimentoModel = require('./../models/atendimentos');

module.exports = app => {
  app.get('/atendimento', (req, res) => {
    atendimentoModel.list()
    .then(response => res.json(response))
    .then(errors => res.status(400).json(errors));
  });

  app.get('/atendimento/:id', (req, res) => {
    const id = parseInt(req.params.id);
    atendimentoModel.show(id)
    .then(result => res.json(result))
    .catch(errors => res.status(400).json(errors));
  });

  app.post('/atendimento', (req, res) => {
    const atendimento = req.body;
    atendimentoModel.add(atendimento)
      .then(response => res.status(201).json(response))
      .catch(error => {
        return res.status(400).json(error)
      });
  });

  app.patch('/atendimento/:id', (req, res) => {
    const atendimento = req.body;
    const id = parseInt(req.params['id']);
    
    atendimentoModel.update(id, atendimento)
    .then(response => res.json(response))
    .catch(errors => res.status(400).json(errors));
  });
  
  app.delete('/atendimento/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    atendimentoModel.delete(id)
      .then(response => res.json(response))
      .catch(errors => res.status(400).json(errors));
  });
}