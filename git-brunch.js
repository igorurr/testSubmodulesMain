const { 
  checkChanges, 
  sysCall, 
  getComandLineArgs, 
  consoleLog, 
  makeMainAndSubmodulesComand 
} = require('./helpers');

/*
    Скрипт не доработан
      отсутствует рекурсивная проверка на наличие сабмодулей
*/

const brunchName = getComandLineArgs()[0]

consoleLog.info(`Переключаемся на ${brunchName}`)
return

sysCall(makeMainAndSubmodulesComand(`git checkout -b ${brunchName}`), true)

if(!checkChanges(true)) {
  sysCall(`git add -A && git commit -m "${brunchName} switch submodule cursor"`, true)
}

process.exit(0)
