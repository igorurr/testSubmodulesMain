const { 
  sysCall,
  getComandLineTail
} = require('../helpers')

const gsfCommandTail = getComandLineTail()

console.log(sysCall('git commit -m "sdf"', true))
