const { sysCall, getComandLineArgs } = require('./helpers')

const brunchName = getComandLineArgs()[0]

const submodulesList = sysCall('git config --file .gitmodules --get-regexp path').stdout
  .split('\n')
  .map(row => row.split(' ')[1])

const mergeResp = sysCall(`git merge ${brunchName} --no-commit --no-ff`)

if (mergeResp.status > 1) {
  process.exit(1)
} else if (mergeResp.status === 0) {
  process.exit(0)
}

// если есть сабмодули и мы имеем просто конфликт (статус 1), а конфликты только в сабмодулях
// то мы считаем что у нас нету конфликтов
const unmergedFiles = sysCall('git diff --name-status --diff-filter=U').stdout
  .split('\n')
  .filter(row => !submodulesList.some( sm => sm === row.trim()[1] ))

const hasUnmerged = unmergedFiles.length > 1

sysCall('git merge --abort')

process.exit(hasUnmerged ? 1 : 0)
