import axios from 'axios'

import { IUser } from './types'

export const createUser = async (newUser: IUser): Promise<IUser> => {
    let timeoutId: any = null
    const timeout = new Promise<undefined>((resolve) => {
        timeoutId = setTimeout(() => resolve(undefined), 10000)
    })

    const resp = await Promise.race([
        axios.post('http://localhost:3002/user', newUser),
        timeout,
    ])
    clearTimeout(timeoutId)

    if (!!resp) {
        return resp.data.user
    }

    throw Error('unable to create user')
}
