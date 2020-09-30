const { 
  sysCall,
  makeMainAndSubmodulesComand 
} = require('./helpers');

process.exit(
  sysCall(
    makeMainAndSubmodulesComand('git status'),
    true
  ).status
)