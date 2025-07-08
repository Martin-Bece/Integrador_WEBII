var DataTypes = require("sequelize").DataTypes;
var _admisiones = require("./admisiones");
var _alas = require("./alas");
var _camas = require("./camas");
var _enfermero = require("./enfermero");
var _especialidades = require("./especialidades");
var _habitaciones = require("./habitaciones");
var _historial_medico = require("./historial_medico");
var _medicos = require("./medicos");
var _motivos = require("./motivos");
var _mutuales = require("./mutuales");
var _origenes = require("./origenes");
var _pacientes = require("./pacientes");
var _sintomas = require("./sintomas");
var _turnos = require("./turnos");
var _unidades = require("./unidades");

function initModels(sequelize) {
  var admisiones = _admisiones(sequelize, DataTypes);
  var alas = _alas(sequelize, DataTypes);
  var camas = _camas(sequelize, DataTypes);
  var enfermero = _enfermero(sequelize, DataTypes);
  var especialidades = _especialidades(sequelize, DataTypes);
  var habitaciones = _habitaciones(sequelize, DataTypes);
  var historial_medico = _historial_medico(sequelize, DataTypes);
  var medicos = _medicos(sequelize, DataTypes);
  var motivos = _motivos(sequelize, DataTypes);
  var mutuales = _mutuales(sequelize, DataTypes);
  var origenes = _origenes(sequelize, DataTypes);
  var pacientes = _pacientes(sequelize, DataTypes);
  var sintomas = _sintomas(sequelize, DataTypes);
  var turnos = _turnos(sequelize, DataTypes);
  var unidades = _unidades(sequelize, DataTypes);

  habitaciones.belongsTo(alas, { as: "ala", foreignKey: "ala_id"});
  alas.hasMany(habitaciones, { as: "habitaciones", foreignKey: "ala_id"});
  admisiones.belongsTo(camas, { as: "cama", foreignKey: "cama_id"});
  camas.hasMany(admisiones, { as: "admisiones", foreignKey: "cama_id"});
  motivos.belongsTo(especialidades, { as: "idEspecialidad_especialidade", foreignKey: "idEspecialidad"});
  especialidades.hasMany(motivos, { as: "motivos", foreignKey: "idEspecialidad"});
  turnos.belongsTo(especialidades, { as: "idEspecialidad_especialidade", foreignKey: "idEspecialidad"});
  especialidades.hasMany(turnos, { as: "turnos", foreignKey: "idEspecialidad"});
  admisiones.belongsTo(habitaciones, { as: "habitacion", foreignKey: "habitacion_id"});
  habitaciones.hasMany(admisiones, { as: "admisiones", foreignKey: "habitacion_id"});
  camas.belongsTo(habitaciones, { as: "habitacion", foreignKey: "habitacion_id"});
  habitaciones.hasMany(camas, { as: "camas", foreignKey: "habitacion_id"});
  turnos.belongsTo(medicos, { as: "idMedico_medico", foreignKey: "idMedico"});
  medicos.hasMany(turnos, { as: "turnos", foreignKey: "idMedico"});
  admisiones.belongsTo(motivos, { as: "motivo", foreignKey: "motivo_id"});
  motivos.hasMany(admisiones, { as: "admisiones", foreignKey: "motivo_id"});
  pacientes.belongsTo(mutuales, { as: "mutual", foreignKey: "mutual_id"});
  mutuales.hasMany(pacientes, { as: "pacientes", foreignKey: "mutual_id"});
  admisiones.belongsTo(origenes, { as: "origen", foreignKey: "origen_id"});
  origenes.hasMany(admisiones, { as: "admisiones", foreignKey: "origen_id"});
  admisiones.belongsTo(pacientes, { as: "paciente", foreignKey: "paciente_id"});
  pacientes.hasMany(admisiones, { as: "admisiones", foreignKey: "paciente_id"});
  historial_medico.belongsTo(pacientes, { as: "idPaciente_paciente", foreignKey: "idPaciente"});
  pacientes.hasMany(historial_medico, { as: "historial_medicos", foreignKey: "idPaciente"});
  turnos.belongsTo(pacientes, { as: "paciente", foreignKey: "paciente_id"});
  pacientes.hasMany(turnos, { as: "turnos", foreignKey: "paciente_id"});
  habitaciones.belongsTo(unidades, { as: "unidad", foreignKey: "unidad_id"});
  unidades.hasMany(habitaciones, { as: "habitaciones", foreignKey: "unidad_id"});

  return {
    admisiones,
    alas,
    camas,
    enfermero,
    especialidades,
    habitaciones,
    historial_medico,
    medicos,
    motivos,
    mutuales,
    origenes,
    pacientes,
    sintomas,
    turnos,
    unidades,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
