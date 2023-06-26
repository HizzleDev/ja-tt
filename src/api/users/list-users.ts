import { safeGet } from 'utils/http'

import { IUser } from './types'

export const listUsers = async (
    start: number = 0,
    limit = 20
): Promise<IUser[]> => {
    const response = await safeGet(
        `http://localhost:3002/users?start=${start}&limit=${limit}`,
        { cache: 'no-store' }
    )

    if (!!response && response.ok) {
        const body = await response.json()
        return body.users
    }

    throw Error('unable to list users')
}
