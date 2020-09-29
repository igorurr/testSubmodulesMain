const { sysCallOut, getComandLineArgs, getCurrentBranch } = require('./helpers');

const brunchName = getComandLineArgs()[0]

const currentBranch = getCurrentBranch()

process.exit(
  sysCallOut(
    makeMainAndSubmodulesComand(
      // чекаем конфликты, если они есть, обрываемся
      // если их нет то делаем мёрдж, он отработает только в репо без сабмодулей, отработает всегда
      // если не отработал, значит в репо есть сабмодули, их можно просто добавить 
      // к комиту и закомитить мёрдж-коммит
      `node \`${process.cwd()}/git-check-conflicts.js\` ${brunchName} && ` +
      `(git merge ${brunchName} || (git add -A && git commit -m \`merge ${brunchName} into ${currentBranch}\`))`
    )
  ).status
)
