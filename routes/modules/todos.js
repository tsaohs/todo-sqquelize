// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const db = require('../../models')
const Todo = db.Todo
const User = db.User

// 引導至new 頁面來新增todo
router.get('/new', (req, res) => {
    return res.render('new')
})

// 當在new 頁面 按下Create button時
router.post('/', (req, res) => {
    const userId = req.user.id
    const name = req.body.name
  
    return Todo.create({ name, UserId : userId})
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

// 引導至edit 頁面來修改todo
router.get('/:id/edit', (req, res) => {
    const userId = req.user.id
    const id = req.params.id    

    return Todo.findOne({ where: { id, UserId : userId } })
        .then(todo => res.render('edit', { todo: todo.get() }))
        .catch(error => console.log(error))
})

// 在edit 頁面點下 Save以後
router.put('/:id', (req, res) => {
    const userId = req.user.id
    const id = req.params.id
    const { name, isDone } = req.body
    console.log(req.body)
  
    return Todo.findOne({ where: { id, UserId : userId} })
      .then(todo => {
        todo.name = name
        todo.isDone = isDone === 'on'
        return todo.save()
      })
      .then(() => res.redirect(`/todos/${id}`))
      .catch(error => console.log(error))
  })

// 當在new 下某個todo 旁的detail 按鈕
router.get('/:id', (req, res) => {
    const userId = req.user.id
    const _id = req.params.id
    return Todo.findOne({
        where: { id: _id, UserId: userId}
    })
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
    const userId = req.user.id
    const id = req.params.id
  
    return Todo.findOne({ where: { id, UserId : userId} })
        .then(todo => todo.destroy())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})


// 匯出路由模組
module.exports = router