const moment = require('moment');

class AtendimentoValidation {
  dataIsValid(atendimento, isUpdate = false) {
    const createdAt = moment().format('YYYY-MM-DD HH:MM:SS');
    
    const dataIsValid = (!isUpdate || atendimento.data) 
    ? moment(atendimento.data).isSameOrAfter(createdAt)
    : true;
    const clienteIsValid = (!isUpdate || atendimento.cliente) 
    ? atendimento.cliente.length >= 10
    : true;
    
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