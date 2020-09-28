const { checkConflicts, sysCall, getComandLineArgs, consoleLog, sysCallOut } = require('./helpers')

const brunchName = getComandLineArgs()[0]

sysCallOut('git status --porcelain')

process.exit(1)
