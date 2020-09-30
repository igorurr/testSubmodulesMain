const { 
  sysCall,
  getComandLineTail,
  makeMainAndSubmodulesComand 
} = require('./helpers');

process.exit(
  sysCall(
    makeMainAndSubmodulesComand(`git commit ${getComandLineTail()}`),
    true
  ).status
)