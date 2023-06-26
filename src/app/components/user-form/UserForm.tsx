'use client'

import { useRouter } from 'next/navigation'
import { FC, useCallback, useMemo } from 'react'
import { v4 } from 'uuid'

import { IUser } from 'api/users/types'
import { createUser } from 'api/users/create-user'
import { updateUser } from 'api/users/update-user'
import { Button } from 'app/components/button'
import { Input } from 'app/components/input'
import { useInput } from 'hooks/use-input'
import { PATHS } from 'utils/paths'
import { isNotEmptyValidatorFn } from 'utils/validators'

interface IUserFormProps {
    mode: 'create' | 'edit' | 'view'
    user?: IUser
}

export const UserForm: FC<IUserFormProps> = ({ mode, user }) => {
    const router = useRouter()

    const {
        errorText: errorTextFirstName,
        onBlur: onBlurFirstName,
        onChange: onChangeFirstName,
        onFocus: onFocusFirstName,
        value: firstName,
    } = useInput(user?.firstName || '', [
        isNotEmptyValidatorFn('The first name must not be empty'),
    ])

    const {
        errorText: errorTextLastName,
        onBlur: onBlurLastName,
        onChange: onChangeLastName,
        onFocus: onFocusLastName,
        value: lastName,
    } = useInput(user?.lastName || '', [
        isNotEmptyValidatorFn('The last name must not be empty'),
    ])

    const {
        errorText: errorTextEmail,
        onBlur: onBlurEmail,
        onChange: onChangeEmail,
        onFocus: onFocusEmail,
        value: email,
    } = useInput(user?.email || '', [
        isNotEmptyValidatorFn('The email must not be empty'),
    ])

    const {
        errorText: errorTextCompany,
        onBlur: onBlurCompany,
        onChange: onChangeCompany,
        onFocus: onFocusCompany,
        value: company,
    } = useInput(user?.company || '', [
        isNotEmptyValidatorFn('The company must not be empty'),
    ])

    const {
        errorText: errorTextPostCode,
        onBlur: onBlurPostCode,
        onChange: onChangePostCode,
        onFocus: onFocusPostCode,
        value: postCode,
    } = useInput(user?.postCode || '', [
        isNotEmptyValidatorFn('The post code must not be empty'),
    ])

    const enabled = useMemo(
        () =>
            !errorTextPostCode &&
            !!postCode &&
            !errorTextCompany &&
            !!company &&
            !errorTextLastName &&
            !!lastName &&
            !errorTextFirstName &&
            !!firstName &&
            !errorTextEmail &&
            !!email &&
            mode !== 'view',
        [
            company,
            email,
            firstName,
            lastName,
            postCode,
            errorTextCompany,
            errorTextEmail,
            errorTextFirstName,
            errorTextPostCode,
            errorTextLastName,
        ]
    )

    const tryCreateUser = useCallback(async () => {
        if (!enabled) {
            return
        }

        const newUser: IUser = {
            company,
            email,
            id: v4(),
            firstName,
            lastName,
            postCode,
            userName: `${firstName.toLowerCase()}-${lastName.toLowerCase()}-${v4().slice(
                0,
                4
            )}`,
        }

        try {
            await createUser(newUser)

            alert('You successfully created a user!')
            router.push(PATHS.DASHBOARD)

            // Interesting bug with NextJS 13 where it always shallow loads the route with no additional server side
            // fetching for a set period of time.
            router.refresh()
        } catch (e) {
            console.error(e)
            alert('Something went wrong creating the user. Please try again.')
        }
    }, [email, enabled, firstName, lastName, company, postCode, router])

    const tryUpdateUser = useCallback(async () => {
        if (!enabled) {
            return
        }

        const updatedUser: IUser = {
            company,
            email,
            id: user.id,
            firstName,
            lastName,
            postCode,
            userName: user.userName,
        }

        try {
            await updateUser(updatedUser)

            alert('You successfully updated a user!')
            router.push(PATHS.DASHBOARD)

            // Interesting bug with NextJS 13 where it always shallow loads the route with no additional server side
            // fetching for a set period of time.
            router.refresh()
        } catch (e) {
            console.error(e)
            alert('Something went wrong updating the user. Please try again.')
        }
    }, [email, enabled, firstName, lastName, company, postCode, , router, user])

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                    disabled={mode === 'view'}
                    errorText={errorTextFirstName}
                    label="First Name *"
                    onBlur={onBlurFirstName}
                    onChange={onChangeFirstName}
                    onFocus={onFocusFirstName}
                    placeholder="e.g. Joe"
                    type="text"
                    value={firstName}
                />

                <Input
                    disabled={mode === 'view'}
                    errorText={errorTextLastName}
                    label="Last Name *"
                    onBlur={onBlurLastName}
                    onChange={onChangeLastName}
                    onFocus={onFocusLastName}
                    placeholder="e.g. Bloggs"
                    type="text"
                    value={lastName}
                />

                <Input
                    disabled={mode === 'view'}
                    errorText={errorTextEmail}
                    label="Email *"
                    onBlur={onBlurEmail}
                    onChange={onChangeEmail}
                    onFocus={onFocusEmail}
                    placeholder="e.g. joe.bloggs@justabout.com"
                    type="email"
                    value={email}
                />

                <Input
                    disabled={mode === 'view'}
                    errorText={errorTextCompany}
                    label="Company *"
                    onBlur={onBlurCompany}
                    onChange={onChangeCompany}
                    onFocus={onFocusCompany}
                    placeholder="e.g. Just About"
                    type="text"
                    value={company}
                />

                <Input
                    disabled={mode === 'view'}
                    errorText={errorTextPostCode}
                    label="Postal Code *"
                    onBlur={onBlurPostCode}
                    onChange={onChangePostCode}
                    onFocus={onFocusPostCode}
                    placeholder="e.g. SW1A 1AA"
                    type="text"
                    value={postCode}
                />
            </div>

            <Button
                disabled={!enabled}
                displayText={mode === 'edit' ? 'Update User' : 'Create User'}
                className="mt-6"
                onClick={mode === 'edit' ? tryUpdateUser : tryCreateUser}
            />
        </>
    )
}
