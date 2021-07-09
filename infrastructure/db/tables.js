const { text } = require("body-parser");

class Tables {
  
  init(connection) {
    this.connection = connection;
    this.criarAtendimentos();
    this.criarPets();
  }

  criarAtendimentos() {
    const sql = `CREATE TABLE IF NOT EXISTS atendimentos (id int NOT NULL AUTO_INCREMENT, 
      cliente varchar(11) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL,
      data datetime NOT NULL, created_at datetime NOT NULL, status varchar(20) NOT NULL, 
      observacao text, PRIMARY KEY(id))`;
    
    this.connection.query(sql, (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Tabela atendimento criada com sucesso!')
      }
    });
  }

  criarPets() {
    const query = `CREATE TABLE IF NOT EXISTS pets (id int NOT NULL AUTO_INCREMENT,
      nome varchar(50), imagem varchar(200) ,PRIMARY KEY(id))`
      
      this.connection.query(query, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Tabela pets criada com sucesso!')
        } 
      })
    }
}

module.exports = new Tables;