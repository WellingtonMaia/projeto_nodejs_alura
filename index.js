const customExpress = require('./config/customExpress');
const connection = require('./infrastructure/db/connection');
const Tables = require('./infrastructure/db/tables');

connection.connect(error => {
  if (error) {
    console.log(error);
  } else {
    console.log('conexão mysql realizada com sucesso!');
 
    Tables.init(connection);

    const app = customExpress();

    app.listen(3000, () => console.log('Servidor executando na porta 3000'));

  }
});