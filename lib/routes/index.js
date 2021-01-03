const express = require('express');
const router = express.Router();

const clienteRxBusiness        = require('../business/ClienteRxBusiness');  
const clienteTxBusiness        = require('../business/ClienteTxBusiness');  

module.exports = function(){

    //cliente
    router.post('/', clienteTxBusiness.registrarCliente); 
    router.put('/:id', clienteTxBusiness.actualizarCliente); 
    router.delete('/', clienteTxBusiness.eliminarCliente);  
    router.get('/', clienteRxBusiness.consultarCliente); 
 
    return router;
}

