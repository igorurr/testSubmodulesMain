const { sysCall, getComandLineArgs } = require('./helpers')

const brunchName = getComandLineArgs()[0]

const submodulesList = sysCall('git config --file .gitmodules --get-regexp path').stdout
  .split('\n')
  .map(row => row.split(' ')[1])

const mergeResp = sysCall(`git merge ${brunchName} --no-commit`)
if(mergeResp.status !== 0) {
  process.exit(1)
}

const unmergedFiles = sysCall('git diff --name-status --diff-filter=U').stdout
  .split('\n')
  .filter(row => !submodulesList.some( sm => sm === row.trim()[1] ))

const hasUnmerged = unmergedFiles.length > 1

sysCall('git merge --abort')

process.exit(hasUnmerged ? 1 : 0)
