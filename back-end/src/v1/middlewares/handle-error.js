const handleError = (error, req, res, next) => {  
  res.status(error.status || 500).send({
    error : {
      status : error.status || 500,
      message : error.message || 'Internal Server',
    }
  })
}

module.exports = handleError