const { spawnSync } = require('child_process');
let child  = spawnSync('npm.cmd', ['git status']);

console.log('sdf', child)
