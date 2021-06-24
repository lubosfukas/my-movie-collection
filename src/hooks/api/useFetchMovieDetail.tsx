import axios from 'axios'
import { useQuery, UseQueryResult } from 'react-query'
import { IMovieDetail } from '../../utils/types'

const fetchMovieDetail = async (movieId: string) => {
    const { data } = await axios.get<IMovieDetail>(
        `http://www.omdbapi.com/?apiKey=${process.env.REACT_APP_API_KEY}&i=${movieId}&plot=full`
    )

    return data
}

const useFetchMovieDetail = (movieId: string): UseQueryResult<IMovieDetail> => {
    return useQuery<IMovieDetail>('fetchMovieDetail', () => fetchMovieDetail(movieId), {
        retry: false
    })
}

export default useFetchMovieDetail
