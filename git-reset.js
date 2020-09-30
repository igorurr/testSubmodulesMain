const { 
  sysCall,
  getComandLineTail,
  makeMainAndSubmodulesComand 
} = require('./helpers');

process.exit(
  sysCall(
    // идея в том чобы для всех сабмодулей без исключения не зависимо 
    // от их результата команда применилась ко всем
    // echo "" эквивалентно true
    makeMainAndSubmodulesComand(`(git reset ${getComandLineTail()} || echo "")`),
    true
  ).status
)