const clienteTxDao	 = require('../dao/ClienteTxDao');  
const clienteRxDao	 = require('../dao/ClienteRxDao');  
const utils 	     = require('../utils/utils'); 
 
/**
 * @description Función que permite registrar cliente
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.registrarCliente = async (req, res) => { 
	 var oResponse			= {};
	 oResponse.oData		= {};
	 var oRequest			= null;
     try {
		 oRequest		 = utils.customRequest(req); 
		 //Validamos el cliente
		 var oFiltro = {};
		 oFiltro.sNumeroIdentificacion = oRequest.oData.sNumeroIdentificacion;
		 var consultarClienteResponse = await clienteRxDao.consultarCliente(oFiltro); 
		 if(consultarClienteResponse.iCode === 1){
			throw new Error(101 + "||" + "Ya existe el cliente con el mismo numero de identificacion.");
		 }

		 //Registramos cliente
		 var oRegistroCliente = {};
		 oRegistroCliente.oAuditRequest  = oRequest.oAuditRequest;
		 oRegistroCliente.oData		  	 = oRequest.oData; 
		 const crearClienteResponse = await  clienteTxDao.crearCliente(oRegistroCliente);
		 if(crearClienteResponse.iCode !== 1){
			throw new Error(crearClienteResponse.iCode + "||" + crearClienteResponse.sMessage);
		 }
     	 oResponse.iCode 		= 1; 
		 oResponse.sMessage		= 'OK';
		 oResponse.oData		= crearClienteResponse.oData;
		
     } catch (e) {
        var oError = utils.customError(e);
		if (e.name === 'Error') {
			oResponse.iCode 	= oError.iCode; 
			oResponse.sMessage	= oError.sMessage;
		}else{
			oResponse.iCode 		= -2;
			oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
		} 
		oResponse.oData	= oRequest.oData;
     }finally{
     	oResponse.sIdTransaccion =  req.headers.sidtransaccion;
     	oResponse = utils.customResponse(oResponse);
     }  
     res.json(oResponse) 
};


/**
 * @description Función que permite actualizar cliente
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.actualizarCliente = async (req, res) => { 
	var oResponse		 = {};
	oResponse.oData		 = {};
	var oRequest		 = null;
	try { 
		oRequest		 = utils.customRequest(req);
		 //Validamos el cliente
		 var oFiltro = {};
		 oFiltro.sNumeroIdentificacion = oRequest.oData.sNumeroIdentificacion;
		 var consultarClienteResponse = await clienteRxDao.consultarCliente(oFiltro); 
		 if(consultarClienteResponse.iCode === 1){
			if(consultarClienteResponse.oData[0].Id !== parseInt(req.params.id, 10)){
				throw new Error(101 + "||" + "Ya existe el cliente con el mismo numero de identificacion.");
			} 
		 }
 
		//actualizamos cliente
		var oRegistro = {};
		oRegistro.oAuditRequest  = oRequest.oAuditRequest;
		oRegistro.oData		     = oRequest.oData; 
		oRegistro.oData.iId	     = parseInt(req.params.id, 10); 
		const actualizarClienteResponse = await  clienteTxDao.actualizarCliente(oRegistro);
		if(actualizarClienteResponse.iCode !== 1){
		   throw new Error(actualizarClienteResponse.iCode + "||" + actualizarClienteResponse.sMessage);
		}
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
		oResponse.oData			= actualizarClienteResponse.oData; 
	   
	} catch (e) {
	   var oError = utils.customError(e);
	   if (e.name === 'Error') {
		   oResponse.iCode 	= oError.iCode; 
		   oResponse.sMessage	= oError.sMessage;
	   }else{
		   oResponse.iCode 		= -2;
		   oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
	   } 
	   oResponse.oData	= oRequest.oData;
	}finally{
		oResponse.sIdTransaccion =  req.headers.sidtransaccion;
		oResponse = utils.customResponse(oResponse);
	}  
	res.json(oResponse) 
};

/**
 * @description Función que permite eliminar Cliente
 * @creation David Villanueva 02/01/2020
 * @update
 */
exports.eliminarCliente = async (req, res) => { 
	var oResponse			= {};
	oResponse.oData		= {};
	var oRequest			= null;
	try {
		oRequest		 = utils.customRequest(req);
		//actualizamos la tabla
		oRequest.oData.aItems.forEach(async function(e){
			var oRegistro = {};
			oRegistro.oAuditRequest  = oRequest.oAuditRequest;
			oRegistro.oData		  	 = {}; 
			oRegistro.oData.iId	  	 = parseInt(e, 10); 
			const eliminarClienteResponse = await  clienteTxDao.eliminarCliente(oRegistro);
			if(eliminarClienteResponse.iCode !== 1){
				throw new Error(eliminarClienteResponse.iCode + "||" + eliminarClienteResponse.sMessage);
			} 
		});
		oResponse.iCode 		= 1; 
		oResponse.sMessage		= 'OK';
	   
	} catch (e) {
	   var oError = utils.customError(e);
	   if (e.name === 'Error') {
		   oResponse.iCode 	= oError.iCode; 
		   oResponse.sMessage	= oError.sMessage;
	   }else{
		   oResponse.iCode 		= -2;
		   oResponse.sMessage	= "Ocurrio un error en el proceso: " +  e.message +" ,Ubicación Error: "+oError.sMessage
	   } 
	   oResponse.oData	= oRequest.oData;
	}finally{
		oResponse.sIdTransaccion =  req.headers.sidtransaccion;
		oResponse = utils.customResponse(oResponse);
	}  
	res.json(oResponse) 
};

