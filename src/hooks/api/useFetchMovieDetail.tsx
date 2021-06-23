import axios, { AxiosError } from 'axios'
import { useQuery, UseQueryResult } from 'react-query'
import { IMovieDetail, IResponseError } from '../../utils/types'

const fetchMovieDetail = async (movieId: string) => {
    const { data } = await axios.get<IMovieDetail>(
        `http://www.omdbapi.com/?apiKey=${process.env.REACT_APP_API_KEY}&i=${movieId}&plot=full`
    )

    return data
}

const useFetchMovieDetail = (movieId: string): UseQueryResult<IMovieDetail, AxiosError<IResponseError>> => {
    return useQuery<IMovieDetail, AxiosError<IResponseError>>('fetchMovieDetail', () => fetchMovieDetail(movieId), {
        retry: false
    })
}

export default useFetchMovieDetail
