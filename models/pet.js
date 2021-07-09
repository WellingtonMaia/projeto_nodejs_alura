const connection = require('../infrastructure/db/connection');
const uploadFile = require('../infrastructure/files/uploadFiles');

class Pet {
  add(pet, res) {
    const sql = `INSERT INTO pets SET ?`;
    
    uploadFile(pet.imagem, pet.nome, (error, newPath) => {
      if (error) {
        res.status(400).json({ error })
      } else {
        const newPet = { nome: pet.nome, imagem: newPath };

        connection.query(sql, pet, error => {
          if(error) {
            res.status(400).json(error);
          } else {
            res.status(201).json(newPet);
          }
        });
      }
    })
  }
}

module.exports = new Pet();