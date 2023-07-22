const dbPool = require('../config/database');

const createTodos = async (body) => {
    const query = `INSERT INTO todos (title, description, deadline) VALUES ('${body.title}', '${body.description}', '${body.deadline}')`

    return dbPool.execute(query);
}

const updateTodos = async (id,body) => {
    const query = `UPDATE todos SET title = '${body.title}', description = '${body.description}', deadline = '${body.deadline}'  WHERE ID = ${id}}`

    return dbPool.execute(query);
}

// Ini Caraku
// const viewOneTodos = async (user_id) => {
//     const query = `SELECT title, description, deadline FROM todos WHERE user_id = ${user_id} ORDER BY deadline LIMIT 1 `

//     return dbPool.execute(query);
// }

// Kata Mas Suhri
const viewOneTodos = async (id,user_id) => {
    const query = `SELECT title, description, deadline FROM todos WHERE user_id = ${user_id} AND id=${id} `

    return dbPool.execute(query);
}

const viewMyTodos = async (user_id) => {
  const query = `SELECT id, title, description, deadline FROM todos WHERE user_id = ${user_id} ORDER BY deadline `

  return dbPool.execute(query);
}

const deleteTodos = async (id) => {
  const query = `DELETE FROM todos WHERE id = ${id}`

  return dbPool.execute(query);
}



module.exports = { 
    createTodos,
    updateTodos,
    viewOneTodos,
    viewMyTodos,
    deleteTodos
}