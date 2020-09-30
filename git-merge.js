const { 
  sysCall, 
  getComandLineArgs, 
  getCurrentBranch, 
  makeMainAndSubmodulesComand 
} = require('./helpers');

const brunchName = getComandLineArgs()[0]

const currentBranch = getCurrentBranch()

process.exit(
  sysCall(
    makeMainAndSubmodulesComand(
      // чекаем конфликты, если они есть, обрываемся
      // если их нет то делаем мёрдж, он всегда отработает в репо без сабмодулей
      // если не отработал, значит в репо есть сабмодули, их можно просто добавить 
      // к комиту и закомитить мёрдж-коммит
      `node "${process.cwd()}/git-check-conflicts.js" ${brunchName} && ` +
      `(git merge ${brunchName} || (git add -A && git commit -m "merge ${brunchName} into ${currentBranch}"))`
    ),
    true
  ).status
)
