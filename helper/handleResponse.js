let response = {
    status: 0
}

export const okRequest = (res,data) => {
    response = {
        status: 200,
        data
    }
    
    return res.json(response)
}

export const internalServerError = (res) => {
    response = {
        status: 500,
        data: 'Error en el servidor - Cheque la consola'
    }
    
    return res.status(500).send(response)
}