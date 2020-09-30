const { 
  sysCall, 
  getComandLineArgs, 
  getComandLineTail,
  consoleLog,
  gsfScript
} = require('./helpers')

const gsfCommand = getComandLineArgs()[0]
const gsfCommandTail = getComandLineTail(3)

let status = 1

const execGsfCommand = cmd => {
  status = sysCall(`node "${gsfScript(cmd)}" ${gsfCommandTail}`, true).status
}

if(
  gsfCommand === 'a' || 
  gsfCommand === 'add'
) {
  execGsfCommand('git-add.js')
}
else if(
  gsfCommand === 'ch' || 
  gsfCommand === 'checkout'
) {
  execGsfCommand('git-checkout.js')
}
else if(
  gsfCommand === 'chp' || 
  gsfCommand === 'checkout-pull'
) {
  execGsfCommand('git-checkout-pull.js')
}
else if(
  gsfCommand === 'c' || 
  gsfCommand === 'commit'
) {
  execGsfCommand('git-commit.js')
}
else if(
  gsfCommand === 'm' || 
  gsfCommand === 'merge'
) {
  execGsfCommand('git-merge.js')
}
else if(
  gsfCommand === 'p' || 
  gsfCommand === 'push'
) {
  execGsfCommand('git-push.js')
} 
else if(
  gsfCommand === 'r' || 
  gsfCommand === 'reset'
) {
  execGsfCommand('git-reset.js')
} 
else if(
  gsfCommand === 's' || 
  gsfCommand === 'status'
) {
  execGsfCommand('git-status.js')
} 
else {
  consoleLog.error(`Command "${gsfCommand}" not found`)
}

process.exit(status)
