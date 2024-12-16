import Joi from "joi";

// Schema for user registration or userInput
export const userRegistrationInputSchema = Joi.object({
  userName: Joi.string()
  .empty("") // Treat empty strings as invalid
  .alphanum().min(3).max(30).required().messages({
    "string.base": "Username must be a string.",
    "string.alphanum": "Username must only contain alphanumeric characters.",
    "string.min": "Username must be at least 3 characters long.",
    "string.max": "Username cannot exceed 30 characters.",
    "any.required": "Username is required.",
  }),
  firstName: Joi.string()
  .empty("") // Treat empty strings as invalid
  .regex(/^[a-zA-Z]+$/).required().messages({
    "string.base": "First name must be a string.",
    "string.pattern.base": "First name must only contain letters.",
    "any.required": "First name is required.",
  }),
  lastName: Joi.string()
  .empty("") // Treat empty strings as invalid
  .regex(/^[a-zA-Z]+$/).required().messages({
    "string.base": "Last name must be a string.",
    "string.pattern.base": "Last name must only contain letters.",
    "any.required": "Last name is required.",
  }),
  email: Joi.string()
  .empty("") // Treat empty strings as invalid
  .email().required().messages({
    "string.email": "Email must be a valid email address.",
    "any.required": "Email is required.",
  }),
  password: Joi.string()
    .min(8)
    .max(128)
    .empty("") // Treat empty strings as invalid
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$"))
    .required()
    .messages({
      "string.min": "Password must be at least 8 characters long.",
      "string.max": "Password cannot exceed 128 characters.",
      "string.pattern.base":
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      "any.required": "Password is required.",
    }),
  mobile: Joi.string()
  .empty("") // Treat empty strings as invalid
  .pattern(/^[0-9]{10}$/).required().messages({
    "string.pattern.base": "Mobile must be a valid 10-digit number.",
    "any.required": "Mobile number is required.",
  }),
  description: Joi.string()
  .empty("") // Treat empty strings as invalid
  .max(500).optional().messages({
    "string.max": "Description cannot exceed 500 characters.",
  }),
});
// Schema for loginInput
export const loginInputSchema = Joi.object({
  email: Joi.string().email()
  .empty("") // Treat empty strings as invalid
  .required().messages({
    "string.email": "Email must be a valid email address.",
    "any.required": "Email is required.",
  }),
  password: Joi.string()
    .min(8)
    .required()
    .empty("") // Treat empty strings as invalid
    .messages({
      "string.min": "Password must be at least 8 characters long.",
      "any.required": "Password is required.",
    }),
});

export const userEditInputSchema = Joi.object({
  userName: Joi.string()
    .empty("") // Treat empty strings as invalid
    .alphanum()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.base": "Username must be a string.",
      "string.alphanum": "Username must only contain alphanumeric characters.",
      "string.min": "Username must be at least 3 characters long.",
      "string.max": "Username cannot exceed 30 characters.",
      "any.required": "Username is required.",
    }),
  firstName: Joi.string()
    .empty("") // Treat empty strings as invalid
    .regex(/^[a-zA-Z]+$/)
    .required()
    .messages({
      "string.base": "First name must be a string.",
      "string.pattern.base": "First name must only contain letters.",
      "any.required": "First name is required.",
    }),
  lastName: Joi.string()
    .empty("") // Treat empty strings as invalid
    .regex(/^[a-zA-Z]+$/)
    .required()
    .messages({
      "string.base": "Last name must be a string.",
      "string.pattern.base": "Last name must only contain letters.",
      "any.required": "Last name is required.",
    }),
  email: Joi.string()
    .empty("") // Treat empty strings as invalid
    .email()
    .required()
    .messages({
      "string.email": "Email must be a valid email address.",
      "any.required": "Email is required.",
    }),
  mobile: Joi.string()
    .empty("") // Treat empty strings as invalid
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      "string.pattern.base": "Mobile must be a valid 10-digit number.",
      "any.required": "Mobile number is required.",
    }),
  description: Joi.string()
    .empty("") // Treat empty strings as invalid
    .max(500)
    .optional()
    .messages({
      "string.max": "Description cannot exceed 500 characters.",
    }),
  image: Joi.any()
    .optional()
    .messages({
      "any.required": "Image is required.",
      "any.base": "Image must be a valid file upload.",
    }),
});

export const resetPasswordInputSchema=Joi.object({
  currentPassword: Joi.string()
    .min(8)
    .max(128)
    .empty("") // Treat empty strings as invalid
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$"))
    .required()
    .messages({
      "string.min": "current password must be at least 8 characters long.",
      "string.max": "current password cannot exceed 128 characters.",
      "string.pattern.base":
        "current password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      "any.required": "current password is required.",
    }),
    newPassword: Joi.string()
    .min(8)
    .max(128)
    .empty("") // Treat empty strings as invalid
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$"))
    .required()
    .messages({
      "string.min": "New password must be at least 8 characters long.",
      "string.max": "New password cannot exceed 128 characters.",
      "string.pattern.base":
        "New password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      "any.required": "New password is required.",
    }),
    confirmNewPassword: Joi.string()
    .min(8)
    .max(128)
    .empty("") // Treat empty strings as invalid
    .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$"))
    .required()
    .messages({
      "string.min": "Confirm new password must be at least 8 characters long.",
      "string.max": "Confirm new password cannot exceed 128 characters.",
      "string.pattern.base":
        "Confirm new password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      "any.required": "Confirm new password is required.",
    }),
})