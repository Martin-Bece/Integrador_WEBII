const db = require('../Modelo'); 

async function obtenerSintomas() {
    return await db.sintomas.findAll()
}

async function buscarSintomaPorMotivo(idMotivo) {
  try {
    const sintomas = await db.sintomas.findAll({
      where: { idMotivo }
    });
    return sintomas;
  } catch (error) {
    console.error('Error buscando síntomas por motivo:', error);
    throw error;
  }
}


module.exports = {obtenerSintomas, buscarSintomaPorMotivo}