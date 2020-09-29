const { checkChanges, sysCallOut, getComandLineArgs, consoleLog } = require('./helpers');

/*
    Скрипт не доработан
      отсутствует рекурсивная проверка на наличие сабмодулей
*/

const brunchName = getComandLineArgs()[0]

consoleLog.info(`Переключаемся на ${brunchName}`)

sysCallOut(makeMainAndSubmodulesComand(`git checkout -b ${brunchName}`))

if(!checkChanges(true)) {
  sysCallOut(`git add -A && git commit -m "${brunchName} switch submodule cursor"`)
}

process.exit(0)
