import axios from 'axios'
import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query'
import { IMoviesApiResponse, IMoviesResponse } from '../../utils/types'

const fetchMovies = async (searchTerm: string, pageParam = 1) => {
    const { data } = await axios.get<IMoviesApiResponse>(
        `http://www.omdbapi.com/?apiKey=${process.env.REACT_APP_API_KEY}&s=${searchTerm}&type=movie&page=${pageParam}`
    )

    const response: IMoviesResponse = {
        ...data,
        nextPage: pageParam + 1
    }

    return response
}

const useFetchMovies = (searchTerm: string): UseInfiniteQueryResult<IMoviesResponse> => {
    return useInfiniteQuery<IMoviesResponse>(
        `search:${searchTerm}`,
        ({ pageParam }) => fetchMovies(searchTerm, pageParam),
        {
            enabled: searchTerm !== '',
            getNextPageParam: (lastPage: IMoviesResponse) => lastPage.nextPage
        }
    )
}

export default useFetchMovies
