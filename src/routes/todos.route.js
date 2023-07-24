const express = require('express');
const todosController = require('../controllers/todos.controller');
const passport = require('passport');

const router = express.Router();

router.post('todos/create', todosController.createTodos);
router.put('todos/update', passport.authenticate('jwt', {session:false}), todosController.updateTodos);
router.get('todos/view/:id', passport.authenticate('jwt', {session:false}), todosController.viewOneTodos);// Menampilakn 1 todos sesuai ID yang ingin ditampilkan
router.get('todos/view', passport.authenticate('jwt', {session:false}), todosController.viewMyTodos);
router.delete('todos/delete', passport.authenticate('jwt', {session:false}), todosController.deleteTodos);

module.exports = router
