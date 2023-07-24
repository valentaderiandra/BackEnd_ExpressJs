const todosService = require('../services/todos.service');
const jwt = require('jsonwebtoken');

const createTodos = async (req, res) => {
    const { body } = req;

    if ( !body.email || !body.password || !body.title || !body.deadline) {
        return res.status(400).json({
            status: 'Fail',
            message: 'Data Email, Password, Title dan Deadline tidak boleh kosong !'
        });
    }

    try {
        const user = await userService.login(body)

        if (!user) {
            return res.status(400).json({
            status: 'fail',
            message: 'Email atau Password salah'
        })}

    const dataUser = user [0][0];

    const jwtToken = jwt.sign(
        {id: dataUser.id, email: dataUser.email},
        process.env.JWT_SECRET)

    console.log(user)

    await todosService.createTodos(body);

    return res.status(201).json({
        status: 'Success',
        mesaage: 'Todos berhasil disimpan',
        token: jwtToken,
        data: body});

    } catch (error) {
        return res.status(500).json({
        status: 'Fail',
        message: 'login gagal'})}
}



const updateTodos = async (req, res) => {
    const { body } = req;
    const id = req.user[0][0].id;

        if ( !body.email || !body.password ) {
            return res.status(400).json({
            status: 'Fail',
            message: 'Data Email dan Password tidak boleh kosong !'
            });
            }

        try {
            const user = await userService.login(body)

      if (!user) {
          return res.status(400).json({
              status: 'fail',
              message: 'Email atau Password salah'
          })
      }

      const dataUser = user [0][0];

      const jwtToken = jwt.sign(
          {id: dataUser.id, email: dataUser.email},
          process.env.JWT_SECRET
      )

        console.log(user)

        if ( !body.title || !body.description || !body.deadline ) {
          return res.status(400).json({
              status: 'fail',
              message: 'Data anda tidak sesuai'
          });
      }
  
      try {
          await todosService.updateTodos(id, body);
  
          return res.status(200).json({
              status: 'Success',
              message: 'Data Todos Berhasil Diperbarui'
          })
      } catch (error) {
          return res.status(500).json({
              status: 'Fail',
              message: 'Gagal perabarui data todos'
          })
      }

  } catch (error) {
      return res.status(500).json({
          status: 'Fail',
          message: 'login gagal'
      })
  }
}



const viewOneTodos = async (req, res) => {

  if ( !body.email || !body.password ) {
      return res.status(400).json({
          status: 'Fail',
          message: 'Data Email dan Password tidak boleh kosong !'
      });
  }

  try {
      const user = await userService.login(body)

      if (!user) {
          return res.status(400).json({
              status: 'fail',
              message: 'Email atau Password salah'
          })
      }

      const dataUser = user [0][0];

      const jwtToken = jwt.sign(
          {id: dataUser.id, email: dataUser.email},
          process.env.JWT_SECRET
      )

        console.log(user)
  
      try {
          const [user] = await todosService.viewOneTodos()

          return res.status(200).json({
              status: 'success',
              message: 'Data berhasil ditampilkan',
              data: user
          })

      } catch (error) {
          return res.status(500).json({
              status: 'Fail',
              message: 'Gagal perabarui data todos'
          })
      }

  } catch (error) {
      return res.status(500).json({
          status: 'Fail',
          message: 'login gagal'
      })
  }
}



const viewMyTodos = async (req, res) => {

  if ( !body.email || !body.password ) {
      return res.status(400).json({
          status: 'Fail',
          message: 'Data Email dan Password tidak boleh kosong !'
      });
  }

  try {
      const user = await userService.login(body)

      if (!user) {
          return res.status(400).json({
              status: 'fail',
              message: 'Email atau Password salah'
          })
      }

      const dataUser = user [0][0];

      const jwtToken = jwt.sign(
          {id: dataUser.id, email: dataUser.email},
          process.env.JWT_SECRET
      )

        console.log(user)
  
      try {
          const [user] = await todosService.viewMyTodos()

          return res.status(200).json({
              status: 'success',
              message: 'Data berhasil ditampilkan',
              data: user
          })

      } catch (error) {
          return res.status(500).json({
              status: 'Fail',
              message: 'Gagal menampilkan data todos'
          })
      }

  } catch (error) {
      return res.status(500).json({
          status: 'Fail',
          message: 'login gagal'
      })
  }
}



const deleteTodos = async (req, res) => {
  const id = req.user[0][0].id

  if ( !body.email || !body.password ) {
      return res.status(400).json({
          status: 'Fail',
          message: 'Data Email dan Password tidak boleh kosong !'
      });
  }

  try {
      const user = await userService.login(body)

      if (!user) {
          return res.status(400).json({
              status: 'Fail',
              message: 'Email atau Password Salah'
          })
      }

      const dataUser = user [0][0];

      const jwtToken = jwt.sign(
          {id: dataUser.id, email: dataUser.email},
          process.env.JWT_SECRET
      )

        console.log(user)
  
        try {
          await todosService.deleteTodos(id)
  
          return res.status(200).json({
              status: 'Succes',
              message: 'Todos Berhasil Dihapus'
          })
      } catch(error) {
          console.log(error)
          return res.status(500).json({
              status: 'Fail',
              message: 'Todos Gagal Dihapus'
          })
      }

  } catch (error) {
      return res.status(500).json({
          status: 'Fail',
          message: 'Login Gagal'
      })
  }
}

module.exports = { 
  createTodos,
  updateTodos,
  viewOneTodos,
  viewMyTodos,
  deleteTodos
}
