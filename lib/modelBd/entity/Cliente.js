const Sequelize =  require('sequelize');
const db = require('../../config/db'); 
 
const Cliente = db.define('cliente', { 
    Id : {
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement : true
    },
    EstadoId            : Sequelize.INTEGER,
    UsuarioCreador      : Sequelize.STRING(64),
    FechaCreacion       : Sequelize.DATE,
    TerminalCreacion    : Sequelize.STRING(64),
    UsuarioModificador  : Sequelize.STRING,
    FechaModificacion   : Sequelize.DATE,
    TerminalModificador    : Sequelize.STRING(64),
    TransaccionId          : Sequelize.STRING(64),
    CodTipoIdentificacion  : Sequelize.STRING(16), 
    TipoIdentificacion     : Sequelize.STRING(128),
    NumeroIdentificacion   : Sequelize.STRING(16),
    Nombre                 : Sequelize.STRING(128),
    Apellido               : Sequelize.STRING(256), 
    CodDepartamento     : Sequelize.STRING(8),
    Departamento        : Sequelize.STRING(128),
    CodProvincia        : Sequelize.STRING(8),
    Provincia           : Sequelize.STRING(128),
    CodDistrito         : Sequelize.STRING(8),
    Distrito            : Sequelize.STRING(128),
    Direccion           : Sequelize.STRING(256),
    Telefono            : Sequelize.STRING(16), 
    Email               : Sequelize.STRING(128), 
    CodEstadoCliente    : Sequelize.INTEGER, 
    EstadoCliente       : Sequelize.STRING(32)
} 
,
{
    schema: "venta",
});
 
module.exports = Cliente;