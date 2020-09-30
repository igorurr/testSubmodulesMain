const { 
  sysCall,
  getComandLineTail
} = require('../helpers')

const gsfCommandTail = getComandLineTail()

console.log(sysCall('git checkout master'))
