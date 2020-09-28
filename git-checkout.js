const { checkConflicts, getComandLineArgs } = require('./helpers');

const brunchName = getComandLineArgs()[0]

if(checkConflicts(brunchName)) {
  process.exit(1)
}

process.exit(0)
