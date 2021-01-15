const express = require('express');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const app = express();

const root = "../../../Data/SanMing"
app.use((req, res, next) => {
    //允许哪些客户端访问我,*代表全部
    res.header('Access-Control-Allow-Origin', '*');
    //允许以哪种方式访问我
    res.header('Access-Control-Allow-Methods', 'get,post')
    next()
})
app.use((req, res, next) => {
    const filePath = path.join(root, req.url);
    console.log(filePath)
    console.log("path:", `${chalk.green(filePath)}`);
    fs.stat(filePath, (err, stats) => {
        console.log(stats)
            //判断该路径是否存在
        if (err) {
            console.log(err)
            res.send(`${filePath} is not a directory`)
            return;
        }
        //如果是一个文件
        if (stats.isFile()) {
            fs.createReadStream(filePath).pipe(res);
            return;
        }
        //如果是一个文件夹
        else if (stats.isDirectory()) {
            fs.readdir(filePath, (err, files) => {
                res.send(files.join(' , '))
                return;
            })
        }

    })
})
app.listen(3000);
let addr = `http://localhost:3000`;
console.log(`server is running :${chalk.green(addr)}`)
