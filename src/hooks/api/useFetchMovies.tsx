import axios, { AxiosError } from 'axios'
import { useQuery, UseQueryResult } from 'react-query'
import { IMoviesResponse, IResponseError } from '../../utils/types'

const fetchMovies = async ({ page, searchTerm }: { page: number; searchTerm: string }) => {
    const { data } = await axios.get(
        `http://www.omdbapi.com/?apiKey=${process.env.REACT_APP_API_KEY}&s=${searchTerm}&type=movie&page=${page}`
    )

    return data
}

const useFetchMovies = ({
    page,
    searchTerm
}: {
    page: number
    searchTerm: string
}): UseQueryResult<IMoviesResponse, AxiosError<IResponseError>> => {
    return useQuery<IMoviesResponse, AxiosError<IResponseError>>(
        `search:${searchTerm}`,
        () => fetchMovies({ page, searchTerm }),
        { enabled: searchTerm !== '' }
    )
}

export default useFetchMovies
