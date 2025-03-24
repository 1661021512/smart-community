// 创建一个子进程
const exec = require('child_process').exec;
// 调用 node-watch 监听模块
const watch = require('node-watch');

// 运行一次编译
exec('npm run compile');

// 监听相关文件、文件夹，有变化则重新运行编译
watch([
    'src/app.ts',
    'src/types.ts',
    'src/utils',
    'src/entity',
    'src/model',
    'src/mock-api',
    'src/pages',
    'src/service'], {recursive: true}, function (evt, name) {
    if (name.split('.').pop() === 'ts') {
        console.log(new Date().toLocaleTimeString(), '监听到TypeScript文件改动，重新编译中...');
        exec('npm run compile');
    }
});

console.log('云智TypeScript自动编译脚本已成功运行...');
