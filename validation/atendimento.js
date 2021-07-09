const moment = require('moment');

class AtendimentoValidation {
  dataIsValid(atendimento) {
    const dataIsValid = moment(atendimento.data).isSameOrAfter(atendimento.created_at);
    const clienteIsValid = atendimento.cliente.length >= 5;

    const validation = [
      {
        name: 'data',
        isValid: dataIsValid,
        message: 'Data deve ser maior ou igual a data atual.'
      },
      {
        name: 'cliente',
        isValid: clienteIsValid,
        message: 'Cliente deve ter pelo menos cinco caracteres.'
      }
    ];

    const errors = validation.filter(field => !field.isValid);
    const hasErrors = errors.length;
    
    if (hasErrors) {
      return errors;
    } 
    
    return [];
  }
}

module.exports = new AtendimentoValidation();