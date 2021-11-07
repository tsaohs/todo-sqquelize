// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const db = require('../../models')
const Todo = db.Todo
const User = db.User

router.get('/', (req, res) => {
    const userId = req.user.id
    console.log(userId)
    User.findByPk(userId)
    .then((user) => {
      if (!user) throw new Error('user not found')

      return Todo.findAll({
        raw: true,
        nest: true,
        where: { UserId: req.user.id }
      })
    })
    .then(todos => res.render('index', { todos }))
    .catch(error => console.error(error))
})

// 匯出路由模組
module.exports = router