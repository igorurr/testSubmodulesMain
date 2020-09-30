const { 
  sysCall, 
  getComandLineNamedArgs, 
  getComandLineTail,
  consoleLog, 
  makeMainAndSubmodulesComand,
  getCurrentBranch
} = require('./helpers');

/*
    Скрипт не доработан
      отсутствует проверка на несуществование ветки
*/

const comandBranch = getComandLineNamedArgs().b
const [branchName, isBrunch] = getCurrentBranch()
const comandLineTail = getComandLineTail(comandBranch ? 4 : 2)

if(!comandBranch && !isBrunch) {
  consoleLog.error('Branch not found')
  process.exit(1)
}

const branch = comandBranch || branchName

consoleLog.info(`Pulling from branch ${branch}`)

process.exit(
  sysCall(
    makeMainAndSubmodulesComand(`git checkout ${branch} && git pull ${comandLineTail}`),
    true
  ).status
)
