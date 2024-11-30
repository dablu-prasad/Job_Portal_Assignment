// import httpStatus        from 'http-status'
// import APIError          from '../utils/APIError'
// import { error,httpStatusInterface } from '../dtos/createUser.dtos'
// // import {env}             from '../../config/vars'

// /**
//  * Error handler. Send stacktrace only during development
//  * @public
//  */
// export const handler   = (err:error, req:Request, res:Response<error>) => {
//     const response = {
//         code:    err.status,
//         message: err.message, //|| httpStatus[err.status]:any,
//         errors:  err.errors,
//         stack:   err.stack,
//     }
//     // if (env !== 'development') {
//     //     delete response.stack
//     // }

//     res.status(err.status)
//     res.json(response)
// }

// /**
//  * If error is not an instanceOf APIError, convert it.
//  * @public
//  */
// export const converter = (err:Error, req:Request, res:Response) => {
//     let convertedError = err

//     if (err instanceof expressValidation.ValidationError) {
//         convertedError = new APIError({
//             message: 'Validation Error',
//             errors:  err.errors,
//             status:  err.statusCode,
//             stack:   err.stack,
//         })
//     } else if (!(err instanceof APIError)) {
//         convertedError = new APIError({
//             message: err.message,
//             status:  err.status,
//             stack:   err.stack,
//         })
//     }

//     return handler(convertedError, req, res)
// }

// /**
//  * Catch 404 and forward to error handler
//  * @public
//  */
// export const notFound = (req:Request, res:Response) => {
//     const err = new APIError({
//         message: 'Not found',
//         status:  httpStatus.NOT_FOUND,
//     })
//     return handler(err, req, res)
// }