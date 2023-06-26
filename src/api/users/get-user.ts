import { safeGet } from 'utils/http'

import { IUser } from './types'

export const getUser = async (userName: string): Promise<IUser> => {
    const response = await safeGet(
        `http://localhost:3002/user?userName=${userName}`,
        { cache: 'no-store' }
    )

    if (!!response && response.ok) {
        const body = await response.json()
        return body.user
    }

    throw Error('unable to get user')
}
