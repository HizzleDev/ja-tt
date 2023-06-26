export interface IValidatorReturn {
    errorText: string
    valid: boolean
}

export type ValidatorFn = (value: string) => IValidatorReturn

export const isNotEmptyValidatorFn: (errorText: string) => ValidatorFn =
    (errorText: string) => (value: string) => ({
        errorText,
        valid: !!value && value.length > 0,
    })
