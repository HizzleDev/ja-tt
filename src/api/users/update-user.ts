import axios from 'axios'

import { IUser } from './types'

export const updateUser = async (userToUpdate: IUser): Promise<IUser> => {
    let timeoutId: any = null
    const timeout = new Promise<undefined>((resolve) => {
        timeoutId = setTimeout(() => resolve(undefined), 10000)
    })

    const resp = await Promise.race([
        axios.put('http://localhost:3002/user', userToUpdate),
        timeout,
    ])
    clearTimeout(timeoutId)

    if (!!resp) {
        return resp.data.user
    }

    throw Error('unable to update user')
}
