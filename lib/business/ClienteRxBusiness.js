const clienteRxDao = require('../dao/ClienteRxDao'); 
const utils 		 = require('../utils/utils'); 
 
/**
 * @description Función que permite consultar cliente
 * @creation David Villanueva 03/01/2020
 * @update
 */
exports.consultarCliente = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {}; 
     try { 
	 
		 var oFiltroCliente = {};
		 oFiltroCliente.sNumeroIdentificacion  	= req.query.sNumeroIdentificacion;
		 oFiltroCliente.iCodEstadoCliente  		= req.query.iCodEstadoCliente;
		 oFiltroCliente.iId 	  				= req.query.iId; 
		 var consultarClienteResponse =  await clienteRxDao.consultarCliente(oFiltroCliente);
		 if(consultarClienteResponse.iCode !== 1){
			throw new Error(consultarClienteResponse.iCode + "||" + consultarClienteResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= consultarClienteResponse.oData;
     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 	= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
		} 
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     res.json(oResponse) 
};
 