const { 
  sysCall,
  getComandLineTail,
  makeMainAndSubmodulesComand,
  gsfScript 
} = require('./helpers');

process.exit(
  sysCall(
    makeMainAndSubmodulesComand(`${gsfScript('helper-scripts/git-commit.js')} ${getComandLineTail()}`),
    true
  ).status
)