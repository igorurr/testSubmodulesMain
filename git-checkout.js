const { 
  sysCall, 
  getComandLineArgs, 
  getComandLineTail,
  consoleLog, 
  makeMainAndSubmodulesComand 
} = require('./helpers');

/*
    Скрипт не доработан
      отсутствует проверка на несуществование ветки
*/

const branchName = getComandLineArgs()[0]
const comandLineTail = getComandLineTail(3)

consoleLog.info(`Checkouting to branch ${branchName}`)

process.exit(
  sysCall(
    makeMainAndSubmodulesComand(`git checkout ${comandLineTail} ${branchName}`),
    true
  ).status
)
