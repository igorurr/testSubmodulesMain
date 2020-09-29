const { checkConflicts, sysCall, getComandLineArgs, consoleLog, sysCallOut } = require('./helpers')

const brunchName = getComandLineArgs()[0]

sysCall(`git merge ${brunchName} --no-commit`)

const hasUnmerged = sysCall('git diff --name-status --diff-filter=U').stdout.split('\n').length > 1

sysCall('git merge --abort')

console.log('cxv', hasUnmerged)

process.exit(hasUnmerged ? 1 : 0)
