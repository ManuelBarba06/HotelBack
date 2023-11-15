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

export const badRequest = (res,data) => {
    response = {
        status: 400,
        data
    }
    
    return res.status(400).json(response)
}

export const unauthorizedRequest = (res,data) => {
    response = {
        status: 401,
        data
    }
    
    return res.status(401).json(response)
}

export const preconditionRequiredRequest = (res,data) => {
    response = {
        status: 428,
        data
    }
    
    return res.status(428).json(response)
}

export const notFoundRequest = (res,data) => {
    response = {
        status: 404,
        data
    }
    
    return res.status(404).json(response)
}

export const internalServerError = (res) => {
    response = {
        status: 500,
        data: 'Error en el servidor - Cheque la consola'
    }
    
    return res.status(500).send(response)
}