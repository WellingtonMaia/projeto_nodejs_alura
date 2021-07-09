const query = require('../infrastructure/db/queries');

class AtendimentoRepository {
  add(atendimento) {
    const sql = `INSERT INTO atendimentos SET ?`;
    return query(sql, atendimento);
  }

  all() {
    const sql = `SELECT * FROM atendimentos`;
    return query(sql);
  }

  findById(id) {
    const sql = `SELECT * FROM atendimentos WHERE id = ?`;
    return query(sql, id)
  }

  update(id, values) {
    const sql = `UPDATE atendimentos SET ? WHERE id = ?`;

    return query(sql, [values, id]);
  }

  delete(id) {
    const sql = 'DELETE FROM atendimentos WHERE id = ?';
    return query(sql, id);
  }
}

module.exports = new AtendimentoRepository;