const { sysCall, sysCallOut, getComandLineArgs, consoleLog } = require('./helpers');

const gitStatusResponse = sysCall('git status --porcelain').stdout

const wasChanges = gitStatusResponse.split('\n').length > 1

const acceptChanges = getComandLineArgs()['accept-changes']

const showNoComitchanges = () => sysCallOut('git status')

if (wasChanges && !acceptChanges) {
  consoleLog.error('Есть незакоммиченные изменения')
  showNoComitchanges()
  process.exit(1)
}
else if (wasChanges && acceptChanges) {
  consoleLog.info('Есть незакоммиченные изменения')
  showNoComitchanges()
}
else {
  consoleLog.info('Незакоммиченные изменения отсутствуют')
}

process.exit(0)
