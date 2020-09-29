const { sysCallOut, getComandLineArgs } = require('./helpers');

const brunchName = getComandLineArgs()[0]

process.exit(
  sysCallOut(
    makeMainAndSubmodulesComand(
      `node \`${process.cwd()}/git-check-conflicts.js\` ${brunchName} && git merge ${brunchName}`
    )
  ).status
)
