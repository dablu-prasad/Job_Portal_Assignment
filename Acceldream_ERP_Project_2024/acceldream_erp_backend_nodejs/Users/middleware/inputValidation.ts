
export const InputValidation = (userInputSchema:any,userInput:any) => {
     const joiValidate = (schema:any, input:any) => {
        const { error, value } = schema.validate(input, { abortEarly: false });
        if (error) {
          const errorMessages = error.details.map((detail:any) =>
          {
            return detail.message
          }
        );
          return { success: false, errors: errorMessages };
        }      
        return { success: true, data: value };
      };
    const validationResult = joiValidate(userInputSchema, userInput);
    if (!validationResult.success) {
        throw new Error(validationResult.errors)
    }
    return validationResult.data; // Return validated data for further use
};
