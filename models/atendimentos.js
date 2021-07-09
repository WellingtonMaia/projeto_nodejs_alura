const moment = require('moment');
const connection = require('./../db/connection');
const validation = require('./../validation/atendimento');

class Atendimento {
  add(atendimento, res) {
    const createdAt = moment().format('YYYY-MM-DD HH:MM:SS');
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    const atendimentoDatado = {...atendimento, 'created_at': createdAt, 'data': data}

    const errors = validation.dataIsValid(atendimentoDatado);

    if (errors.length) {
      res.status(400).json(errors);
    
    } else {

      const sql = `INSERT INTO atendimentos SET ?`;

      connection.query(sql, atendimentoDatado, (error, result) => {
        if (error) {
          res.status(400).json(error);
        } else {
          res.status(201).json(atendimento);
        }
      });
    }
  }

  list(res) {
    const sql = `SELECT * FROM atendimentos`;

    connection.query(sql, (error, result) => {
      if (error)
      {
        res.status(400).json(error);
      } else {
        res.status(400).json(result);
      }
    });
  }

  show(id, res) {
    const sql = `SELECT * FROM atendimentos WHERE id = ?`;

    connection.query(sql, id, (error, result) => {
      const atendimento = result[0];
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json(atendimento);
      }
    });
  }

  update(id, values, res) {
    const sql = `UPDATE atendimentos SET ? WHERE id = ?`;
    
    if (values.data) {
      values.data = moment(values.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    }

    connection.query(sql, [values, id], (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({...values, id});
      }
    });
  }

  delete(id, res) {
    const sql = 'DELETE FROM atendimentos WHERE id = ?';
    connection.query(sql, id, (error, result) => {
      if (error) {
        res.status(400).json(error);
      } else {
        res.status(200).json({
          success: `Agendamento ${id} deletado com sucesso!`,
          status: 200,
        });
      }
    });
  }
}

module.exports = new Atendimento();