import axios from 'axios'

export const deleteUser = async (id: string) => {
    let timeoutId: any = null
    const timeout = new Promise<undefined>((resolve) => {
        timeoutId = setTimeout(() => resolve(undefined), 10000)
    })

    const resp = await Promise.race([
        axios.delete(`http://localhost:3002/user?id=${id}`),
        timeout,
    ])
    clearTimeout(timeoutId)

    if (!resp) {
        throw Error('unable to delete user')
    }
}
