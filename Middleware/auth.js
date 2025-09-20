const { obtenerMedicoPorDNI } = require('../Controller/medicosController');
const { usuarios: Usuario } = require('../Modelo');
const bcrypt = require('bcrypt');

function estaAutenticado(req, res, next) {
  if (req.session.usuario) {
    return next();
  }
  res.redirect('/index');
}

/* function tieneRol(rol) {
  return function(req, res, next) {
    if (req.session.usuario && req.session.usuario.rol === rol) {
      return next();
    }
    res.status(403).send('No autorizado');
  };
} */

function esMedico(req, res, next) {
  if (req.session.usuario && req.session.usuario.rol === 'medico') {
    return next();
  }
  res.status(403).send('Acceso solo para médicos');
}

function esEnfermero(req, res, next) {
  if (req.session.usuario && req.session.usuario.rol === 'enfermero') {
    return next();
  }
  res.status(403).send('Acceso solo para enfermeros');
}

function esAdmision(req, res, next) {
  if (req.session.usuario && req.session.usuario.rol === 'admision') {
    return next();
  }
  res.status(403).send('Acceso solo para personal de admisión');
}

function esAdmin(req, res, next) {
  if (req.session.usuario && req.session.usuario.rol === 'admin') {
    return next();
  }
  res.status(403).send('Acceso solo para administradores');
}

async function autentificarUsuario(req, res) {
  const { username, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { usuario: username } });

    if (!usuario) {
      return res.render('index', { error: 'Usuario o contraseña incorrectos' });
    }

    const esValida = await usuario.validarContraseña(password);

    if (!esValida) {
      return res.render('index', { error: 'Usuario o contraseña incorrectos' });
    }

    req.session.usuario = {
      id: usuario.idUsuario,
      usuario: usuario.usuario,
      rol: usuario.rol,
      dni: usuario.dni
    };

    switch (usuario.rol) {
      case 'admision':
        return res.redirect('/Admision');
      case 'enfermero':
        return res.redirect('/Enfermeria');
      case 'medico':
        const medico = await obtenerMedicoPorDNI(usuario.dni);
        if (medico.idEspecialidad == 21 || medico.idEspecialidad == 22) {
          return res.redirect('/MedicosE');
        } else {
          return res.redirect('/Medicos');
        }
      case 'admin':
        return res.redirect('/Administracion');
    }

  } catch (error) {
    console.error(error);
    res.render('index', { error: 'Error interno, intente luego' });
  }
}

function logout(req, res) {
  req.session.destroy(err => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      return res.status(500).send('Error al cerrar sesión');
    }
    res.redirect('/');
  });
}

async function getCurrentUser(req, res, next) {
  if (req.session.usuario && req.session.usuario.id) {
    try {
      const usuario = await Usuario.findByPk(req.session.usuario.id);
      if (usuario) {
        req.currentUser = usuario;
        res.locals.currentUser = usuario;
      } else {
        req.currentUser = null;
        res.locals.currentUser = null;
      }
    } catch (error) {
      console.error('Error obteniendo usuario actual:', error);
      req.currentUser = null;
      res.locals.currentUser = null;
    }
  } else {
    req.currentUser = null;
    res.locals.currentUser = null;
  }
  next();
}

function esMedicoOEnfermero(req, res, next) {
  if (req.session.usuario && 
      (req.session.usuario.rol === 'medico' || req.session.usuario.rol === 'enfermero')) {
    return next();
  }
  res.status(403).send('Acceso solo para médicos o enfermeros');
}


module.exports = {
  estaAutenticado,
  //tieneRol,
  esMedico,
  esEnfermero,
  esAdmision,
  esAdmin,
  autentificarUsuario,
  logout,
  getCurrentUser,
  esMedicoOEnfermero
};
