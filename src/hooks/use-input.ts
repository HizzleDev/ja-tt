import React, { useCallback, useEffect, useRef, useState } from 'react'

import { ValidatorFn } from 'utils/validators'

export interface IInputData<
    T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement
> {
    errorText?: string
    onBlur: () => void
    onChange: (e: React.FormEvent<T>) => void
    onFocus: () => void
    setErrorText: React.Dispatch<React.SetStateAction<string | undefined>>
    setValueManual: (value: string) => void
    updateIsError: () => void
    value: string
}

export function useInput<
    T extends HTMLInputElement | HTMLTextAreaElement = HTMLInputElement
>(defaultValue?: string, defaultValidators: ValidatorFn[] = []): IInputData<T> {
    const [touched, setTouched] = useState<boolean>(false)
    const [focused, setFocused] = useState<boolean>(false)
    const [errorText, setErrorText] = useState<string | undefined>(undefined)
    const [value, setValue] = useState<string>(defaultValue || '')

    const validatorsRef = useRef<ValidatorFn[]>(defaultValidators)
    const [validators, setValidators] =
        useState<ValidatorFn[]>(defaultValidators)

    const queuedErrorTextRef = useRef<string | undefined>(undefined)

    const setNewErrorText = useCallback((newValue: string | undefined) => {
        queuedErrorTextRef.current = newValue
    }, [])

    const onChange = (e: React.FormEvent<T>) => {
        setValue(e.currentTarget.value)
    }

    useEffect(() => {
        // values of the validators change though...
        if (defaultValidators.toString() !== validatorsRef.current.toString()) {
            validatorsRef.current = defaultValidators
            setValidators(defaultValidators)
        } else {
            for (let i = 0; i < validatorsRef.current.length; i++) {
                const defaultValidator = defaultValidators[i]
                const currentValidator = validatorsRef.current[i]

                const defaultValid = defaultValidator(value)
                const currentValid = currentValidator(value)

                if (defaultValid.valid !== currentValid.valid) {
                    validatorsRef.current = defaultValidators
                    setValidators(defaultValidators)
                    return
                }
            }
        }
    }, [defaultValidators, value])

    const updateIsError = useCallback(() => {
        if (!!queuedErrorTextRef.current) {
            setErrorText(queuedErrorTextRef.current)
            queuedErrorTextRef.current = undefined
            return
        }

        let currentErrorText = undefined
        for (const validator of validators) {
            const validatorReturn = validator(value)
            currentErrorText = !validatorReturn.valid
                ? validatorReturn.errorText
                : undefined
            if (currentErrorText) {
                break
            }
        }
        if (touched && value !== undefined) {
            setErrorText(currentErrorText)
        }
    }, [touched, validators, value])

    const onBlur = () => {
        setFocused(false)
    }

    const onFocus = () => {
        setFocused(true)
        setTouched(true)
        setErrorText(undefined)
        queuedErrorTextRef.current = undefined
    }

    useEffect(() => {
        if (!focused) {
            updateIsError()
        }
    }, [focused, touched, updateIsError, value])

    return {
        errorText,
        onBlur,
        onChange,
        onFocus,
        setErrorText: setNewErrorText,
        setValueManual: setValue,
        updateIsError,
        value,
    }
}
