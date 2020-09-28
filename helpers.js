const { spawnSync } = require('child_process');

/*
    выполняет команду не выводя её результат в консоль
*/
const sysCall = comand => {
  const [ cmd, ...comandArgs ] = comand.split(' ')
  
  return spawnSync(cmd, comandArgs, {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'pipe',
    encoding: 'utf-8'
  });
}

const sysCallOut = comand => {
  const [ cmd, ...comandArgs ] = comand.split(' ')
  
  spawnSync(cmd, comandArgs, {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit',
    encoding: 'utf-8'
  });
}

const getComandLineArgs = () => Object.fromEntries(
  process.argv.slice(2)
    .map(arg => arg.match(/^(--[^\s]*)$/))
    .filter(arg => arg)
    .map(arg => arg[0].split('='))
    .map(([key, value]) => [key.slice(2), value || true])
)

// см. https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
const consoleLog = {
  error: msg => console.log('\x1b[31m%s\x1b[0m', msg),
  info: msg => console.log('\x1b[36m%s\x1b[0m', msg),
}

module.exports = {
  sysCall,
  sysCallOut,
  getComandLineArgs,
  consoleLog
}