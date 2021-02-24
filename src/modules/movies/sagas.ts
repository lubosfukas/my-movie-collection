/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { takeEvery, put, call, select } from 'redux-saga/effects'

import { LOAD_MOVIES, CHANGE_PAGE, SEARCH_MOVIES } from './actionTypes'
import { loadMovies, loadMoviesFailed, loadMoviesSuccess } from './actions'
import { IState } from './types'
import { addIds } from '../../utils/helpers'
import { config } from '../../utils'

function* fetchMovies(action: { type: string; payload: { page: number; searchTerm: string } }) {
    const searchTerm = action.payload.searchTerm
    const page = action.payload.page + 1

    try {
        const { data } = yield call(() =>
            axios.get(`http://www.omdbapi.com/?apiKey=${config.API_KEY}&s=${searchTerm}&page=${page}`)
        )

        const movies = data['Search']
        const mov = addIds(movies)
        const totalResults = parseFloat(data.totalResults)

        yield put(loadMoviesSuccess({ movies: mov, totalResults }))
    } catch (error) {
        const errorResponse = error?.response.data['Error'] || ''
        const errorMessage = errorResponse ? `Failed to load - ${errorResponse}` : 'Failed to load'
        yield put(loadMoviesFailed(errorMessage))
    }
}

function* changePage(action: { type: string; payload: number }) {
    const searchTerm = yield select((state: IState) => state.searchTerm)
    const page = action.payload

    yield put(loadMovies({ searchTerm, page }))
}

function* searchMovies(action: { type: string; payload: string }) {
    const searchTerm = action.payload
    const page = yield select((state: IState) => state.page)

    yield put(loadMovies({ searchTerm, page }))
}

export default function* searchMoviesSaga(): IterableIterator<any> {
    yield takeEvery(LOAD_MOVIES, fetchMovies)
    yield takeEvery(CHANGE_PAGE, changePage)
    yield takeEvery(SEARCH_MOVIES, searchMovies)
}
