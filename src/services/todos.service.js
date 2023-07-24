const dbPool = require('../config/database');

const MendapatkanUserId = async (body) => {
  const query = `SELECT id FROM users WHERE email = '${body.email}' AND password = '${body.password}'`

  const [rows, fields] = await dbPool.execute(query);
  if (rows.length > 0) {
    return rows[0].id;
  }
  return null;
}

const createTodos = async (user_id,body) => {
    const query = `INSERT INTO todos (title, user_id, description, deadline) VALUES ('${body.title}','${user_id}', '${body.description}', '${body.deadline}')`

    return dbPool.execute(query);
}

const updateTodos = async (body) => {
    const query = `UPDATE todos SET title = '${body.title}', description = '${body.description}', deadline = '${body.deadline}'  WHERE ID = '${body.id}}'`

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

const deleteTodos = async (body) => {
  const query = 'DELETE FROM todos WHERE id = ?';
  const values = [body.id];

  return dbPool.execute(query, values);
  // const query = `DELETE FROM todos WHERE id = ${id}`

  // return dbPool.execute(query);
}

module.exports = { 
    MendapatkanUserId,
    createTodos,
    updateTodos,
    viewOneTodos,
    viewMyTodos,
    deleteTodos
}