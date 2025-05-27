const db = require('../Modelo'); 

async function obtenerMutuales() {
  return await db.mutuales.findAll();
}

module.exports = { obtenerMutuales };
