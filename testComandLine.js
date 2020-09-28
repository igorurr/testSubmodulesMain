const { sysCall } = require('./helpers');

const gitStatusResponse = sysCall('git status --porcelain').stdout

const gitStatusLines = gitStatusResponse.split('\n').length

console.log('sdf', gitStatusLines)
