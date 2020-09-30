const { 
  sysCall,
  makeMainAndSubmodulesComand 
} = require('./helpers');

process.exit(
  sysCall(
    makeMainAndSubmodulesComand('git push'),
    true
  ).status
)