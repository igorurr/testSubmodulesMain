const { 
  sysCall,
  makeMainAndSubmodulesComand,
  getComandLineTail
} = require('./helpers');

const comandLineTail = getComandLineTail()

process.exit(
  sysCall(
    makeMainAndSubmodulesComand(`git push ${comandLineTail}`),
    true
  ).status
)