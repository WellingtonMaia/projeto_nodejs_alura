const moment = require('moment');
const axios = require('axios');
const connection = require('../infrastructure/db/connection');
const validation = require('../controllers/validation/atendimento');
const repository = require('../repositories/atendimento');

class Atendimento {
  add(atendimento) {
    const createdAt = moment().format('YYYY-MM-DD HH:MM:SS');
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    const atendimentoDatado = {...atendimento, 'created_at': createdAt, 'data': data}

    const errors = validation.dataIsValid(atendimentoDatado);

    if (errors.length) {
      return new Promise((_, reject) => reject(errors));
      
    } else {
      return repository.add(atendimentoDatado)
        .then((result) => {
          const id = result.insertId 
          return { ...atendimento, id };
        });
    }
  }

  list() {
    return repository.all();
  }

  show(id) {
    return repository.findById(id).then(async (result) => {
      const atendimento = result[0];
      const cpf = atendimento.cliente;
      const cliente = new Promise(async (resolve, reject) => {
        try {
          const { data } = await axios.get(`http://localhost:8082/${cpf}`);
          resolve(data);
        } catch (error) {
          reject(error);
        }
      });
    
      atendimento.cliente = await cliente.then(result => result);
      return atendimento;  
    });
  }

  update(id, values) {
    
    if (values.data) {
      values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    }

    const errors = validation.dataIsValid(values, true);

    if (errors.length) {
      res.status(400).json(errors);
    }

    return repository.update(id, values).then((_) => {
      return { ...values, id}
    });
  }

  delete(id) {
    return repository.delete(id).then((_) => {
      const response = {
        success: `Agendamento ${id} deletado com sucesso!`,
        status: 200,
      };
      return response;
    });
  }
}

module.exports = new Atendimento();