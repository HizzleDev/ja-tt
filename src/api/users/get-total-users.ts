import { safeGet } from 'utils/http'

import { IUser } from './types'

export const getTotalUsers = async (): Promise<number> => {
    const response = await safeGet(
        'http://localhost:3002/total-users',
        { cache: 'no-store' }
    )

    if (!!response && response.ok) {
        const body = await response.json()
        return body.total
    }

    throw Error('unable to get total users')
}
