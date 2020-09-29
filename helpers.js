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
  
  return spawnSync(cmd, comandArgs, {
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

const makeMainAndSubmodulesComand = (comand) => 
  `git submodule foreach --recursive "${comand}" && ${comand}`

// см. https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const consoleLog = {
  error: msg => console.log('\x1b[31m%s\x1b[0m', msg),
  warning: msg => console.log('\x1b[33m%s\x1b[0m', msg),
  info: msg => console.log('\x1b[36m%s\x1b[0m', msg),
}

// [brunchOrCommit, isBrunch]
const getCurrentBranch = () => {
  const gitLog = sysCall('git log -n 1').stdout.split('\n')[0]

  const commit = gitLog.split(' ')[1]

  const brunchRegex = gitLog.match(/->\s(.+?)(,\s|\))/)

  return [brunchRegex ? brunchRegex[1] : commit, !!brunchRegex]
}

// есть ли изменения в репо, игнорируя его сабмодули
const checkChanges = (errorColorWarning=false) => {
  const gitStatusResponse = sysCall('git status --porcelain --ignore-submodules=all').stdout

  const wasChanges = gitStatusResponse.split('\n').length > 1

  if (wasChanges) {
    (errorColorWarning ? consoleLog.warning : consoleLog.error)('Есть незакоммиченные изменения')
    sysCallOut('git status')
    return false
  }
  else {
    consoleLog.info('Незакоммиченные изменения отсутствуют')
  }

  return true
}

const checkConflicts = (brunchName) => {
  sysCallOut(makeMainAndSubmodulesComand(`node \`${process.cwd()}/git-check-conflicts.js\` ${brunchName}`))
  // sysCallOut(`node "${process.cwd()}/git-check-conflicts.js" ${brunchName} && git submodule foreach node "${process.cwd()}/git-check-conflicts.js" ${brunchName}`)
}

module.exports = {
  sysCall,
  sysCallOut,
  getComandLineArgs,
  getComandLineNamedArgs,
  makeMainAndSubmodulesComand,
  consoleLog,
  getCurrentBranch,
  checkChanges,
  checkConflicts
}