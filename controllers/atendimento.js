const atendimentoModel = require('./../models/atendimentos');

module.exports = app => {
  app.get('/atendimento', (req, res) => {
    atendimentoModel.list(res);
  });

  app.get('/atendimento/:id', (req, res) => {
    const id = parseInt(req.params.id);

    atendimentoModel.show(id, res)
  })

  app.post('/atendimento', (req, res) => {
    const atendimento = req.body;
    
    atendimentoModel.add(atendimento, res);
  });

  app.patch('/atendimento/:id', (req, res) => {
    const atendimento = req.body;
    const id = parseInt(req.params['id']);
    
    atendimentoModel.update(id, atendimento, res);
  });
  
  app.delete('/atendimento/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    atendimentoModel.delete(id, res);
  });
}