const regexEmailValidation = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/


export const checkEmailValidation = (email) => {
    return regexEmailValidation.test(email)
}