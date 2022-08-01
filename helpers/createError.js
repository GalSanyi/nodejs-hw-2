const massages = {
    400:'Bad request',
    401:'Unauthorize',
    403:'Forbidden',
    404:'NotFound',
    409:'Conflict'
}

const createError =(status, massage = massages[status])=>{
    const error = new Error(massage);
    error.status = status;
    return error;
}

module.exports = createError; 