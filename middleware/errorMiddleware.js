/* middleware is callback function that can detect
   response error, request in application. */

const errorMidleware = (err, req, res, next) => {
    console.log('Here is a Middleware Error')
    const statusCode = res.statusCode? res.statusCode : 500
    res.status(statusCode)
    res.json({message : err.message, stack: process.env.NODE_ENV === "development" ? err.stack : null})
}

module.exports = errorMidleware