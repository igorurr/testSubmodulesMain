const { 
  sysCall,
  getComandLineTail,
  makeMainAndSubmodulesComand 
} = require('./helpers');

const comandLineTail = getComandLineTail()

process.exit(
  sysCall(
    // идея в том чобы для всех сабмодулей без исключения не зависимо 
    // от их результата команда применилась ко всем
    // echo "" эквивалентно true
    makeMainAndSubmodulesComand(`(git add ${comandLineTail} || echo "")`),
    true
  ).status
)