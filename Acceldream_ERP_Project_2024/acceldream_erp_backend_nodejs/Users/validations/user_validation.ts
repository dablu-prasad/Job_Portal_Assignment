import {Joi} from 'express-validation'

/*
* createEmployee validation
*/
export const createEmployee = {
    body: Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        phoneNumber: Joi.string().required(),
        dateOfBirth: Joi.string().required(),
        address: Joi.string().required(),
        department: Joi.string().required(),
        position: Joi.string().required(),
        salary: Joi.number().required(),
        hireDate: Joi.string().required(),
        manager: Joi.string().required(),
        photo: Joi.string().required(),
    }),
}
/*
* getEmployee validation
*/
export const getUser = {
    query: Joi.object({
        id: Joi.string(),
    }),
}
/*
* updateEmployee validation
*/
export const updateEmployee = {
    body: Joi.object({
        firstName: Joi.string(),
        lastName: Joi.string(),
        email: Joi.string().email(),
        phoneNumber: Joi.string(),
        dateOfBirth: Joi.string(),
        address: Joi.string(),
        department: Joi.string(),
        position: Joi.string(),
        salary: Joi.string(),
        hireDate: Joi.string(),
        manager: Joi.string(),
        photo: Joi.string(),
    }),
}
/*
* deleteEmployee validation
*/
export const deleteEmployee = {
    query: Joi.object({
        id: Joi.string(),
    }),
}