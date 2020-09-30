const { 
  sysCall, 
  getComandLineArgs, 
  consoleLog, 
  makeMainAndSubmodulesComand 
} = require('./helpers');

/*
    Скрипт не доработан
      отсутствует проверка на существование ветки
*/

const branchName = getComandLineArgs()[0]

consoleLog.info(`Making branch ${branchName}`)

process.exit(
  sysCall(
    makeMainAndSubmodulesComand(`git checkout -b ${branchName}`),
    true
  ).status
)
