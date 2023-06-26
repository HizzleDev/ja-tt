import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'

const retries = 3
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Performs a GET http request for a resource and retries up to 3 times if there
 * is an error or a timeout
 *
 * @param resource - The resource that is being requested
 * @param initialOptions - Any additional axios request config that is required
 * @typeParam T - Response object
 *
 * @returns The promise of the response body or undefined in the case of an error
 */
export async function safeGet<T = any>(
    resource: string,
    initialOptions: Partial<RequestInit> = {}
): Promise<Response | undefined> {
    for (let i = 0; i < retries; i++) {
        const convertedHeaders = Object.entries(
            initialOptions.headers || {}
        ).reduce(
            (prevObj, [key, value]) => ({
                ...prevObj,
                [key
                    .split('-')
                    .map((part) => part.toLowerCase())
                    .join('-')]: value,
            }),
            {}
        )

        const options = {
            ...initialOptions,
            headers: {
                ...convertedHeaders,
            },
        }

        let timeoutId: any = null
        const timeout = new Promise<undefined>((resolve) => {
            timeoutId = setTimeout(() => resolve(undefined), 10000)
        })

        try {
            const resp = await Promise.race([
                fetch(resource, {
                    method: 'get',
                    ...options,
                }),
                timeout,
            ])
            clearTimeout(timeoutId)

            if (resp !== undefined) {
                return resp
            }

            if (i === retries - 1) {
                throw Error(
                    `Failed to get requested resource (${resource}) in ${retries} attempts`
                )
            }
        } catch (e) {
            clearTimeout(timeoutId)
            if (i === retries - 1) {
                throw e
            }
        }

        await sleep(1000 * i + 1)
    }
}
