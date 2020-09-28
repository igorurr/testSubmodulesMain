const { spawnSync } = require('child_process');

const sysCall = comand => {
  const [ cmd, ...comandArgs ] = comand.split(' ')
  
  return spawnSync(cmd, comandArgs, {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'pipe',
    encoding: 'utf-8'
  });
}

module.exports = {
  sysCall
}