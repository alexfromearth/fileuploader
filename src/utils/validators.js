// композиции валидации
export const composeValidators = (...validators) => value =>
    validators.reduce((error, validator) => error || validator(value), undefined)


export let required = (values) => {
    if (!values) {
        return "Required"
    }
    return undefined;
}

export const minLength = min => value =>
    value && value.length < min
        ? `Minimum number of characters ${min}`
        : undefined;

export const maxLength = max => value =>
    value && value.length > max
        ? `Maximum number of characters ${max}`
        : undefined;

export let isEmail = value => (value && value.includes("@") && value.includes(".") ? undefined : "Login should be an e-mail");
