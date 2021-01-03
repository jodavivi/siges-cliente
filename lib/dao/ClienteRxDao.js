const cliente = require('../modelBd/entity/Cliente');  

/**
 * @description Función que permite consultar las clientes
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.consultarCliente = async function (oFiltro) { 
    const oResponse = {};
    try {
        var oFiltroLista = {}; 
        oFiltroLista.where ={}; 
        if(oFiltro.sRazonSocial !== undefined){
            oFiltroLista.where.RazonSocial  = oFiltro.sRazonSocial; 
        } 
        if(oFiltro.iId !== undefined){
            oFiltroLista.where.Id  = oFiltro.iId; 
        } 
         
        oFiltroLista.where.EstadoId     = 1; 
        const consultarListaResponse = await  cliente.findAll(oFiltroLista); 
        if(consultarListaResponse.length > 0){
            oResponse.iCode     = 1;
            oResponse.sMessage  = 'OK'; 
            oResponse.oData     = consultarListaResponse;
        }else{
            oResponse.iCode     = 2;
            oResponse.sMessage  = 'No se encontro información del cliente'; 
            oResponse.oData     = oFiltro;
        }
    } catch (e) { 
        oResponse.iCode     = -1;
        oResponse.sMessage  = 'Ocurrio un error en la tabla: cliente, error: '+ e.message;
        oResponse.oData     = oFiltro;
    }  
    return oResponse;
}