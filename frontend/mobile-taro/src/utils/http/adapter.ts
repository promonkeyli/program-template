import Taro, { request, request } from '@tarojs/taro'
import type {
    AxiosAdapter,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError
} from 'axios'

const taroAdapter: AxiosAdapter = (
    config: AxiosRequestConfig
): Promise<AxiosResponse> => {
    return new Promise((resolve, reject) => {
        const {
            url = '',
            method = 'get',
            data,
            params,
            headers,
            timeout,
            baseURL,
            signal
        } = config

        const fullUrl = baseURL ? baseURL + url : url

        const requestTask = Taro.request({
            url: fullUrl,
            method: method.toUpperCase() as any,
            data: method.toLowerCase() === 'get' ? params : data,
            header: headers as Record<string, string>,
            timeout,

            success(res) {
                const response: AxiosResponse = {
                    data: res.data,
                    status: res.statusCode,
                    statusText: res.errMsg,
                    headers: res.header,
                    config: config as any,
                    request: res
                }
                resolve(response)
            },

            fail(err) {
                const axiosError = createAxiosError(err, config)
                reject(axiosError)
            }
        })

        // ✅ 支持 AbortController
        if (signal) {
            signal.addEventListener('abort', () => {
                requestTask.abort()
            })
        }
    })
}

export default taroAdapter

// ========================
// 错误对象构造
// ========================
function createAxiosError(error: any, config: AxiosRequestConfig): AxiosError {
    const err = new Error(error?.errMsg || 'Request Error') as AxiosError

    err.config = config
    err.request = error
    err.isAxiosError = true

    return err
}
