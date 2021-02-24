import { CHANGE_PAGE, LOAD_MOVIES, LOAD_MOVIES_FAILED, LOAD_MOVIES_SUCCESS, SEARCH_MOVIES } from './actionTypes'
import {
    ILoadMoviesActionPayload,
    ILoadMoviesAction,
    ILoadMoviesFailedAction,
    ILoadMoviesSuccessActionPayload,
    ILoadMoviesSuccessAction,
    IChangePageAction,
    ISearchMoviesAction
} from './types'

export const loadMovies = ({ searchTerm, page }: ILoadMoviesActionPayload): ILoadMoviesAction => ({
    type: LOAD_MOVIES,
    payload: { searchTerm, page }
})

export const loadMoviesFailed = (error: string): ILoadMoviesFailedAction => ({
    type: LOAD_MOVIES_FAILED,
    payload: error
})

export const loadMoviesSuccess = ({
    movies,
    totalResults
}: ILoadMoviesSuccessActionPayload): ILoadMoviesSuccessAction => ({
    type: LOAD_MOVIES_SUCCESS,
    payload: { movies, totalResults }
})

export const changePage = (page: number): IChangePageAction => ({
    type: CHANGE_PAGE,
    payload: page
})

export const searchMovies = (searchTerm: string): ISearchMoviesAction => ({
    type: SEARCH_MOVIES,
    payload: searchTerm
})
