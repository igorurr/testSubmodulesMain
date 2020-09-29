const { sysCall, getComandLineArgs, getComandLineNamedArgs } = require('./helpers')

const brunchName = getComandLineArgs()[0]

const noSubmodules = getComandLineNamedArgs()['no-submodules']

const submodulesList = sysCall('git config --file .gitmodules --get-regexp path').stdout
  .split('\n')
  .map(row => row.split(' ')[1])

sysCall(`git merge ${brunchName} --no-commit`)

let unmergedFiles = sysCall('git diff --name-status --diff-filter=U').stdout.split('\n')

if(noSubmodules) {
  unmergedFiles = unmergedFiles
    .filter(row => !submodulesList.some( sm => sm === row.trim()[1] ))
}

const hasUnmerged = unmergedFiles.length > 1

sysCall('git merge --abort')

console.log('cxv', hasUnmerged)

process.exit(hasUnmerged ? 1 : 0)
