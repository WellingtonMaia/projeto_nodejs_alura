const { text } = require("body-parser");

class Tables {
  
  init(connection) {
    this.connection = connection;
    this.criarAtendimentos();
  }

  criarAtendimentos() {
    const sql = `CREATE TABLE IF NOT EXISTS atendimentos (id int NOT NULL AUTO_INCREMENT, 
      cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL,
      data datetime NOT NULL, created_at datetime NOT NULL, status varchar(20) NOT NULL, 
      observacao text, PRIMARY KEY(id))`;
    
    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Tabela atendimento criada com sucesso!')
      }
    })
  }
}

module.exports = new Tables;