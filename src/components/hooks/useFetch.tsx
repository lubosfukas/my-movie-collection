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
        loading: boolean
    }
]

interface IProps {
    url: string
    params?: any
}

const useFetch = ({ url, params }: IProps): IResponse => {
    const [data, setData] = useState<Data>()
    const [error, setError] = useState<IError>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await axios.get(url, { ...params })

                setData(response.data)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }

        fetchData()
    }, [url, params])

    return [{ data, error, loading }]
}

export default useFetch
