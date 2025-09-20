var DataTypes = require("sequelize").DataTypes;
var _EmpleadosAdmision = require("./EmpleadosAdmision");
var _admisiones = require("./admisiones");
var _alas = require("./alas");
var _camas = require("./camas");
var _enfermeros = require("./enfermeros");
var _especialidades = require("./especialidades");
var _estudios = require("./estudios");
var _evaluacion_fisica = require("./evaluacion_fisica");
var _habitaciones = require("./habitaciones");
var _historial_medico = require("./historial_medico");
var _informe_enfermero = require("./informe_enfermero");
var _informes = require("./informes");
var _medicos = require("./medicos");
var _motivos = require("./motivos");
var _mutuales = require("./mutuales");
var _origenes = require("./origenes");
var _pacientes = require("./pacientes");
var _pacientes_estudios = require("./pacientes_estudios");
var _plan_de_cuidados = require("./plan_de_cuidados");
var _sintomas = require("./sintomas");
var _turnos = require("./turnos");
var _unidades = require("./unidades");
var _usuarios = require("./usuarios");
var _diagnostico = require("./diagnostico");
var _historia_clinica_interna = require("./historia_clinica_interna");
var _informes_alta = require("./informes_alta");
var _administradores = require("./administradores");

function initModels(sequelize) {
  var EmpleadosAdmision = _EmpleadosAdmision(sequelize, DataTypes);
  var admisiones = _admisiones(sequelize, DataTypes);
  var alas = _alas(sequelize, DataTypes);
  var camas = _camas(sequelize, DataTypes);
  var enfermeros = _enfermeros(sequelize, DataTypes);
  var especialidades = _especialidades(sequelize, DataTypes);
  var estudios = _estudios(sequelize, DataTypes);
  var evaluacion_fisica = _evaluacion_fisica(sequelize, DataTypes);
  var habitaciones = _habitaciones(sequelize, DataTypes);
  var historial_medico = _historial_medico(sequelize, DataTypes);
  var informe_enfermero = _informe_enfermero(sequelize, DataTypes);
  var informes = _informes(sequelize, DataTypes);
  var medicos = _medicos(sequelize, DataTypes);
  var motivos = _motivos(sequelize, DataTypes);
  var mutuales = _mutuales(sequelize, DataTypes);
  var origenes = _origenes(sequelize, DataTypes);
  var pacientes = _pacientes(sequelize, DataTypes);
  var pacientes_estudios = _pacientes_estudios(sequelize, DataTypes);
  var plan_de_cuidados = _plan_de_cuidados(sequelize, DataTypes);
  var sintomas = _sintomas(sequelize, DataTypes);
  var turnos = _turnos(sequelize, DataTypes);
  var unidades = _unidades(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);
  var diagnostico = _diagnostico(sequelize, DataTypes);
  var historia_clinica_interna = _historia_clinica_interna(sequelize, DataTypes);
  var informes_alta = _informes_alta(sequelize, DataTypes);
  var administradores = _administradores(sequelize, DataTypes);

  estudios.belongsToMany(pacientes, { as: 'idPaciente_pacientes', through: pacientes_estudios, foreignKey: "idEstudio", otherKey: "idPaciente" });
  pacientes.belongsToMany(estudios, { as: 'idEstudio_estudios', through: pacientes_estudios, foreignKey: "idPaciente", otherKey: "idEstudio" });
  estudios.belongsTo(especialidades, { as: "idEspecialidad_especialidade", foreignKey: "idEspecialidad" });
  especialidades.hasMany(estudios, { as: "estudios", foreignKey: "idEspecialidad" });
  habitaciones.belongsTo(alas, { as: "ala", foreignKey: "ala_id"});
  alas.hasMany(habitaciones, { as: "habitaciones", foreignKey: "ala_id"});
  admisiones.belongsTo(camas, { as: "cama", foreignKey: "cama_id"});
  camas.hasMany(admisiones, { as: "admisiones", foreignKey: "cama_id"});
  informe_enfermero.belongsTo(enfermeros, { as: "id_enfermero_enfermero", foreignKey: "id_enfermero"});
  enfermeros.hasMany(informe_enfermero, { as: "informe_enfermeros", foreignKey: "id_enfermero"});
  plan_de_cuidados.belongsTo(enfermeros, { as: "id_enfermero_enfermero", foreignKey: "id_enfermero"});
  enfermeros.hasMany(plan_de_cuidados, { as: "plan_de_cuidados", foreignKey: "id_enfermero"});
  informe_enfermero.belongsTo(especialidades, { as: "id_especialidad_especialidade", foreignKey: "id_especialidad"});
  especialidades.hasMany(informe_enfermero, { as: "informe_enfermeros", foreignKey: "id_especialidad"});
  motivos.belongsTo(especialidades, { as: "idEspecialidad_especialidade", foreignKey: "idEspecialidad"});
  especialidades.hasMany(motivos, { as: "motivos", foreignKey: "idEspecialidad"});
  turnos.belongsTo(especialidades, { as: "idEspecialidad_especialidade", foreignKey: "idEspecialidad"});
  especialidades.hasMany(turnos, { as: "turnos", foreignKey: "idEspecialidad"});
  informes.belongsTo(estudios, { as: "idEstudio_estudio", foreignKey: "idEstudio"});
  estudios.hasMany(informes, { as: "informes", foreignKey: "idEstudio"});
  pacientes_estudios.belongsTo(estudios, { as: "idEstudio_estudio", foreignKey: "idEstudio"});
  estudios.hasMany(pacientes_estudios, { as: "pacientes_estudios", foreignKey: "idEstudio"});
  admisiones.belongsTo(habitaciones, { as: "habitacion", foreignKey: "habitacion_id"});
  habitaciones.hasMany(admisiones, { as: "admisiones", foreignKey: "habitacion_id"});
  camas.belongsTo(habitaciones, { as: "habitacion", foreignKey: "habitacion_id"});
  habitaciones.hasMany(camas, { as: "camas", foreignKey: "habitacion_id"});
  informes.belongsTo(medicos, { as: "idMedico_medico", foreignKey: "idMedico"});
  medicos.hasMany(informes, { as: "informes", foreignKey: "idMedico"});
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
  informe_enfermero.belongsTo(pacientes, { as: "id_paciente_paciente", foreignKey: "id_paciente"});
  pacientes.hasMany(informe_enfermero, { as: "informe_enfermeros", foreignKey: "id_paciente"});
  informes.belongsTo(pacientes, { as: "idPaciente_paciente", foreignKey: "idPaciente"});
  pacientes.hasMany(informes, { as: "informes", foreignKey: "idPaciente"});
  pacientes_estudios.belongsTo(pacientes, { as: "idPaciente_paciente", foreignKey: "idPaciente"});
  pacientes.hasMany(pacientes_estudios, { as: "pacientes_estudios", foreignKey: "idPaciente"});
  plan_de_cuidados.belongsTo(pacientes, { as: "id_paciente_paciente", foreignKey: "id_paciente"});
  pacientes.hasMany(plan_de_cuidados, { as: "plan_de_cuidados", foreignKey: "id_paciente"});
  turnos.belongsTo(pacientes, { as: "paciente", foreignKey: "paciente_id"});
  pacientes.hasMany(turnos, { as: "turnos", foreignKey: "paciente_id"});
  historial_medico.belongsTo(sintomas, { as: "idSintoma_sintoma", foreignKey: "idSintoma"});
  sintomas.hasMany(historial_medico, { as: "historial_medicos", foreignKey: "idSintoma"});
  habitaciones.belongsTo(unidades, { as: "unidad", foreignKey: "unidad_id"});
  unidades.hasMany(habitaciones, { as: "habitaciones", foreignKey: "unidad_id"});
  diagnostico.belongsTo(pacientes, { as: "paciente", foreignKey: "idPaciente" });
  pacientes.hasMany(diagnostico, { as: "diagnosticos", foreignKey: "idPaciente" });
  historia_clinica_interna.belongsTo(pacientes, { as: "paciente", foreignKey: "idPaciente" });
  pacientes.hasMany(historia_clinica_interna, { as: "historias_clinicas", foreignKey: "idPaciente" });
  informes_alta.belongsTo(admisiones, { as: "admision", foreignKey: "admision_id" });
  admisiones.hasMany(informes_alta, { as: "informes_alta", foreignKey: "admision_id" });
  informes.belongsTo(especialidades, { as: "idEspecialidad_especialidade", foreignKey: "idEspecialidad"});
  especialidades.hasMany(informes, { as: "informes", foreignKey: "idEspecialidad" });

  return {
    EmpleadosAdmision,
    admisiones,
    alas,
    camas,
    enfermeros,
    especialidades,
    estudios,
    evaluacion_fisica,
    habitaciones,
    historial_medico,
    historia_clinica_interna,
    informe_enfermero,
    informes,
    informes_alta,
    medicos,
    motivos,
    mutuales,
    origenes,
    pacientes,
    pacientes_estudios,
    plan_de_cuidados,
    sintomas,
    turnos,
    unidades,
    usuarios,
    administradores,
    diagnostico
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
