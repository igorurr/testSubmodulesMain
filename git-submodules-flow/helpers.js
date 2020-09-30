const { execSync } = require('child_process')

/*
    выполняет команду не выводя её результат в консоль
*/
const sysCall = (comand, isOut=false) => {
  try {
    return {
      stdout: execSync(
        comand, 
        {
          cwd: process.cwd(),
          env: process.env,
          stdio: isOut ? 'inherit' : 'pipe',
          encoding: 'utf-8'
        }
      ),
      status: 0
    }
  } catch(e) {
    return {
      stderr: e.stderr,
      status: e.status
    }
  }
}

const getComandLineArgs = () => process.argv.slice(2)
  .filter(arg => !arg.match(/^(--[^\s]*)$/))

const getComandLineNamedArgs = () => Object.fromEntries(
  process.argv.slice(2)
    .filter(arg => arg.match(/^(--[^\s]*)$/))
    .map(arg => arg.split('='))
    .map(([key, value]) => [key.slice(2), value || true])
)

const getComandLineTail = (start = 2) => 
  process.argv
    .slice(start)
    // если параметр в скрипт пришёл в кавычках, возвращаем их на законное место
    .map(arg => arg.match(' ') ? `"${arg}"` : arg)
    .join(' ')

const makeMainAndSubmodulesComand = (comand) => {
  const ecranedComand = comand.replace(/"/g, '\\"')

  return `git submodule foreach --recursive "${ecranedComand}" && echo Main-repo: && ${comand}`
}

// см. https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const consoleLog = {
  error: msg => console.log('\x1b[31m%s\x1b[0m', msg),
  warning: msg => console.log('\x1b[33m%s\x1b[0m', msg),
  info: msg => console.log('\x1b[36m%s\x1b[0m', msg),
}

// [brunchOrCommit, isBrunch]
const getCurrentBranch = () => {
  const brunchRegex = sysCall('git status -s -b --porcelain').stdout.split('\n')[0].match(/\s(.+?)(\.{3}|$)/)
  const gitLog = sysCall('git log -n 1').stdout.split('\n')[0]

  const commit = gitLog.split(' ')[1]

  return [brunchRegex ? brunchRegex[1] : commit, !!brunchRegex]
}

const gsfScript = script => `${__dirname}/${script}`

module.exports = {
  sysCall,
  getComandLineArgs,
  getComandLineNamedArgs,
  getComandLineTail,
  makeMainAndSubmodulesComand,
  consoleLog,
  getCurrentBranch,
  gsfScript
}