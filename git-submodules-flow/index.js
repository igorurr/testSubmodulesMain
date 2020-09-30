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
  execGsfCommand('gsf-add.js')
}
else if(
  gsfCommand === 'ch' || 
  gsfCommand === 'checkout'
) {
  execGsfCommand('gsf-checkout.js')
}
else if(
  gsfCommand === 'chp' || 
  gsfCommand === 'checkout-pull'
) {
  execGsfCommand('gsf-checkout-pull.js')
}
else if(
  gsfCommand === 'c' || 
  gsfCommand === 'commit'
) {
  execGsfCommand('gsf-commit.js')
}
else if(
  gsfCommand === 'm' || 
  gsfCommand === 'merge'
) {
  execGsfCommand('gsf-merge.js')
}
else if(
  gsfCommand === 'p' || 
  gsfCommand === 'push'
) {
  execGsfCommand('gsf-push.js')
} 
else if(
  gsfCommand === 'r' || 
  gsfCommand === 'reset'
) {
  execGsfCommand('gsf-reset.js')
} 
else if(
  gsfCommand === 's' || 
  gsfCommand === 'status'
) {
  execGsfCommand('gsf-status.js')
} 
else {
  consoleLog.error(`Command "${gsfCommand}" not found`)
}

process.exit(status)
