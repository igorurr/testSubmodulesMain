const { 
  sysCall,
  getComandLineTail
} = require('../helpers')

/*
    скрипт нужен чисто для переопределения статусов
*/

const gsfCommandTail = getComandLineTail()

const comandStatus = sysCall(`git commit ${gsfCommandTail}`, true).status

// если 0 - команда выполнилась успешно
// если 1 - нечего коммитить, что тоже ок
process.exit(comandStatus <= 1 ? 0 : comandStatus)
