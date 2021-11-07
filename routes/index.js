// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 掛載 middleware
const { authenticator } = require('../middleware/auth')



// 引入 todos 模組程式碼
const todos = require('./modules/todos')
// 將網址結構符合 /todos 字串開頭的 request 導向 todos 模組 
router.use('/todos', authenticator , todos)

// 引入 users 模組程式碼
const users = require('./modules/users')
// 將網址結構符合 /users 字串開頭的 request 導向 users 模組 
router.use('/users', users)

const auth = require('./modules/auth')
router.use('/auth', auth)

// 引入 home 模組程式碼
const home = require('./modules/home')
// 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/', authenticator ,home)

// 匯出路由器
module.exports = router