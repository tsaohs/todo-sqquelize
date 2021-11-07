// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
// 引用 Todo model
const db = require('../../models')
const Todo = db.Todo
const User = db.User

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body
    User.findOne({ where: { email } }).then(user => {
        if (user) {
            console.log('User already exists')
            return res.render('register', {
                name,
                email,
                password,
                confirmPassword
            })
        }
        return bcrypt
            .genSalt(10)
            .then(salt => bcrypt.hash(password, salt))
            .then(hash => User.create({
                name,
                email,
                password: hash
            }))
            .then(() => res.redirect('/'))
            .catch(err => console.log(err))
      })
})

router.get('/logout', (req, res) =>{
    req.logout()
    req.flash('success_msg', '你已經成功登出。')
    res.redirect('/users/login')
})

// 匯出路由模組
module.exports = router