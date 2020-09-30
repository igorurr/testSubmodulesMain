const { 
  sysCall, 
  getComandLineArgs, 
  consoleLog, 
  makeMainAndSubmodulesComand 
} = require('./helpers');

/*
    Скрипт не доработан
      отсутствует проверка на несуществование ветки
*/

const branchName = getComandLineArgs()[0]

consoleLog.info(`Checkouting to branch ${branchName}`)

process.exit(
  sysCall(
    makeMainAndSubmodulesComand(`git checkout ${branchName}`),
    true
  ).status
)
