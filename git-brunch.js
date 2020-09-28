const { checkChanges, sysCallOut, getComandLineArgs, consoleLog } = require('./helpers');

const brunchName = getComandLineArgs()[0]

consoleLog.info(`Переключаемся на ${brunchName}`)

sysCallOut(`git submodule foreach "git checkout -b ${brunchName}" && git checkout -b ${brunchName}`)

if(!checkChanges(brunchName)) {
  sysCallOut(`git add -A && git commit -m "${brunchName} switch submodule cursor"`)
}

process.exit(0)
