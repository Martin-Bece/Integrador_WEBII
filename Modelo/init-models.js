var DataTypes = require("sequelize").DataTypes;
var _admisiones = require("./admisiones");
var _alas = require("./alas");
var _camas = require("./camas");
var _enfermero = require("./enfermero");
var _enfermeros = require("./enfermeros");
var _especialidades = require("./especialidades");
var _evaluacion_fisica = require("./evaluacion_fisica");
var _habitaciones = require("./habitaciones");
var _historial_medico = require("./historial_medico");
var _informe_enfermero = require("./informe_enfermero");
var _medicos = require("./medicos");
var _motivos = require("./motivos");
var _mutuales = require("./mutuales");
var _origenes = require("./origenes");
var _pacientes = require("./pacientes");
var _plan_de_cuidados = require("./plan_de_cuidados");
var _sintomas = require("./sintomas");
var _turnos = require("./turnos");
var _unidades = require("./unidades");

function initModels(sequelize) {
  var admisiones = _admisiones(sequelize, DataTypes);
  var alas = _alas(sequelize, DataTypes);
  var camas = _camas(sequelize, DataTypes);
  var enfermero = _enfermero(sequelize, DataTypes);
  var enfermeros = _enfermeros(sequelize, DataTypes);
  var especialidades = _especialidades(sequelize, DataTypes);
  var evaluacion_fisica = _evaluacion_fisica(sequelize, DataTypes);
  var habitaciones = _habitaciones(sequelize, DataTypes);
  var historial_medico = _historial_medico(sequelize, DataTypes);
  var informe_enfermero = _informe_enfermero(sequelize, DataTypes);
  var medicos = _medicos(sequelize, DataTypes);
  var motivos = _motivos(sequelize, DataTypes);
  var mutuales = _mutuales(sequelize, DataTypes);
  var origenes = _origenes(sequelize, DataTypes);
  var pacientes = _pacientes(sequelize, DataTypes);
  var plan_de_cuidados = _plan_de_cuidados(sequelize, DataTypes);
  var sintomas = _sintomas(sequelize, DataTypes);
  var turnos = _turnos(sequelize, DataTypes);
  var unidades = _unidades(sequelize, DataTypes);

  habitaciones.belongsTo(alas, { as: "ala", foreignKey: "ala_id"});
  alas.hasMany(habitaciones, { as: "habitaciones", foreignKey: "ala_id"});
  admisiones.belongsTo(camas, { as: "cama", foreignKey: "cama_id"});
  camas.hasMany(admisiones, { as: "admisiones", foreignKey: "cama_id"});
  informe_enfermero.belongsTo(enfermeros, { as: "id_enfermero_enfermero", foreignKey: "id_enfermero"});
  enfermeros.hasMany(informe_enfermero, { as: "informe_enfermeros", foreignKey: "id_enfermero"});
  plan_de_cuidados.belongsTo(enfermeros, { as: "id_enfermero_enfermero", foreignKey: "id_enfermero"});
  enfermeros.hasMany(plan_de_cuidados, { as: "plan_de_cuidados", foreignKey: "id_enfermero"});
  motivos.belongsTo(especialidades, { as: "idEspecialidad_especialidade", foreignKey: "idEspecialidad"});
  especialidades.hasMany(motivos, { as: "motivos", foreignKey: "idEspecialidad"});
  turnos.belongsTo(especialidades, { as: "idEspecialidad_especialidade", foreignKey: "idEspecialidad"});
  especialidades.hasMany(turnos, { as: "turnos", foreignKey: "idEspecialidad"});
  admisiones.belongsTo(habitaciones, { as: "habitacion", foreignKey: "habitacion_id"});
  habitaciones.hasMany(admisiones, { as: "admisiones", foreignKey: "habitacion_id"});
  camas.belongsTo(habitaciones, { as: "habitacion", foreignKey: "habitacion_id"});
  habitaciones.hasMany(camas, { as: "camas", foreignKey: "habitacion_id"});
  informe_enfermero.belongsTo(medicos, { as: "id_medico_medico", foreignKey: "id_medico"});
  medicos.hasMany(informe_enfermero, { as: "informe_enfermeros", foreignKey: "id_medico"});
  turnos.belongsTo(medicos, { as: "idMedico_medico", foreignKey: "idMedico"});
  medicos.hasMany(turnos, { as: "turnos", foreignKey: "idMedico"});
  admisiones.belongsTo(motivos, { as: "motivo", foreignKey: "motivo_id"});
  motivos.hasMany(admisiones, { as: "admisiones", foreignKey: "motivo_id"});
  sintomas.belongsTo(motivos, { as: "idMotivo_motivo", foreignKey: "idMotivo"});
  motivos.hasMany(sintomas, { as: "sintomas", foreignKey: "idMotivo"});
  pacientes.belongsTo(mutuales, { as: "mutual", foreignKey: "mutual_id"});
  mutuales.hasMany(pacientes, { as: "pacientes", foreignKey: "mutual_id"});
  admisiones.belongsTo(origenes, { as: "origen", foreignKey: "origen_id"});
  origenes.hasMany(admisiones, { as: "admisiones", foreignKey: "origen_id"});
  admisiones.belongsTo(pacientes, { as: "paciente", foreignKey: "paciente_id"});
  pacientes.hasMany(admisiones, { as: "admisiones", foreignKey: "paciente_id"});
  evaluacion_fisica.belongsTo(pacientes, { as: "id_paciente_paciente", foreignKey: "id_paciente"});
  pacientes.hasMany(evaluacion_fisica, { as: "evaluacion_fisicas", foreignKey: "id_paciente"});
  historial_medico.belongsTo(pacientes, { as: "idPaciente_paciente", foreignKey: "idPaciente"});
  pacientes.hasMany(historial_medico, { as: "historial_medicos", foreignKey: "idPaciente"});
  plan_de_cuidados.belongsTo(pacientes, { as: "id_paciente_paciente", foreignKey: "id_paciente"});
  pacientes.hasMany(plan_de_cuidados, { as: "plan_de_cuidados", foreignKey: "id_paciente"});
  turnos.belongsTo(pacientes, { as: "paciente", foreignKey: "paciente_id"});
  pacientes.hasMany(turnos, { as: "turnos", foreignKey: "paciente_id"});
  habitaciones.belongsTo(unidades, { as: "unidad", foreignKey: "unidad_id"});
  unidades.hasMany(habitaciones, { as: "habitaciones", foreignKey: "unidad_id"});

  return {
    admisiones,
    alas,
    camas,
    enfermero,
    enfermeros,
    especialidades,
    evaluacion_fisica,
    habitaciones,
    historial_medico,
    informe_enfermero,
    medicos,
    motivos,
    mutuales,
    origenes,
    pacientes,
    plan_de_cuidados,
    sintomas,
    turnos,
    unidades,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
