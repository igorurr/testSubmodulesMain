const { spawnSync } = require('child_process')
const splitargs = require('splitargs')

/*
    выполняет команду не выводя её результат в консоль
*/
const sysCall = comand => {
  const [ cmd, ...comandArgs ] = splitargs(comand)
  
  return spawnSync(cmd, comandArgs, {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'pipe',
    encoding: 'utf-8'
  });
}

const sysCallOut = comand => {
  const [ cmd, ...comandArgs ] = splitargs(comand)
  
  spawnSync(cmd, comandArgs, {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit',
    encoding: 'utf-8'
  });
}

const getComandLineArgs = () => process.argv.slice(2)
  .filter(arg => !arg.match(/^(--[^\s]*)$/))

const getComandLineNamedArgs = () => Object.fromEntries(
  process.argv.slice(2)
    .filter(arg => arg.match(/^(--[^\s]*)$/))
    .map(arg => arg.split('='))
    .map(([key, value]) => [key.slice(2), value || true])
)

// см. https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const consoleLog = {
  error: msg => console.log('\x1b[31m%s\x1b[0m', msg),
  info: msg => console.log('\x1b[36m%s\x1b[0m', msg),
}

// есть ли изменения в родительском репо и сабмодулях
const checkChanges = (mainRepoOnly=false) => {
  const gitStatusResponse = sysCall(
    `git status --porcelain ${mainRepoOnly ? '--ignore-submodules=all' : ''}`
  ).stdout

  const wasChanges = gitStatusResponse.split('\n').length > 1

  const acceptChanges = getComandLineNamedArgs()['accept-changes']

  const showNoComitchanges = () => sysCallOut('git status')

  if (wasChanges && !acceptChanges) {
    consoleLog.error('Есть незакоммиченные изменения')
    showNoComitchanges()
    return false
  }
  else if (wasChanges && acceptChanges) {
    consoleLog.info('Есть незакоммиченные изменения')
    showNoComitchanges()
  }
  else {
    consoleLog.info('Незакоммиченные изменения отсутствуют')
  }

  return true
}

const checkConflicts = (brunchName) => {
  sysCallOut(`git submodule foreach node "${process.cwd()}/git-check-conflicts.js" ${brunchName}`)
}

module.exports = {
  sysCall,
  sysCallOut,
  getComandLineArgs,
  getComandLineNamedArgs,
  consoleLog,
  checkChanges,
  checkConflicts
}