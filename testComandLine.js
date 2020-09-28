const { sysCall } = require('./helpers');

const gitStatusResponse = sysCall('git status --porcelain').stdout

const wasChanges = gitStatusResponse.split('\n').length > 1

if (wasChanges) {
  process.exit(1)
}

console.log('asasas', wasChanges, gitStatusResponse.split('\n'))
