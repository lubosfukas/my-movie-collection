/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react'
import axios from 'axios'

type Data = any

interface IError {
    message: string
    httpStatusCode: number
}

type IResponse = [
    {
        data: Data
        error?: IError
        isLoading: boolean
    }
]

interface IProps {
    url: string
    params?: any
}

const useFetch = ({ url, params }: IProps): IResponse => {
    const [data, setData] = useState<Data>()
    const [error, setError] = useState<IError>()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(url, { ...params })

                setData(response.data)
                setIsLoading(false)
            } catch (error) {
                setError(error)
                setIsLoading(false)
            }
        }

        fetchData()
    }, [url, params])

    return [{ data, error, isLoading }]
}

export default useFetch
