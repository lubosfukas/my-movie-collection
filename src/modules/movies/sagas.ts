/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios'
import { takeEvery, put, call, select } from 'redux-saga/effects'

import { LOAD_MOVIES, CHANGE_PAGE, SEARCH_MOVIES } from './actionTypes'
import { loadMovies, loadMoviesFailed, loadMoviesSuccess } from './actions'
import { IState } from './types'
import { config } from '../../utils'

const getSearchTerm = (state: IState) => state.searchTerm
const getPage = (state: IState) => state.page

function* fetchMovies(action: { type: string; payload: { page: number; searchTerm: string } }) {
    const searchTerm = action.payload.searchTerm
    const page = action.payload.page + 1

    try {
        const { data } = yield call(() =>
            axios.get(`http://www.omdbapi.com/?apiKey=${config.API_KEY}&s=${searchTerm}&type=movie&page=${page}`)
        )

        const strResponse: string = data['Response']
        const isValid = strResponse.toLowerCase() === 'true'

        if (isValid) {
            const movies = data['Search']
            const totalResults = parseInt(data.totalResults, 10)
            yield put(loadMoviesSuccess({ movies: movies, totalResults }))
        } else {
            const errorMessage = data['Error']
            yield put(loadMoviesFailed(errorMessage))
        }
    } catch (error) {
        const errorMessage: string = error?.response.data['Error'] || ''
        yield put(loadMoviesFailed(errorMessage))
    }
}

function* changePage(action: { type: string; payload: number }) {
    const searchTerm = yield select(getSearchTerm)
    const page = action.payload

    yield put(loadMovies({ searchTerm, page }))
}

function* searchMovies(action: { type: string; payload: string }) {
    const searchTerm = action.payload
    const page = yield select(getPage)

    yield put(loadMovies({ searchTerm, page }))
}

export default function* searchMoviesSaga(): IterableIterator<any> {
    yield takeEvery(LOAD_MOVIES, fetchMovies)
    yield takeEvery(CHANGE_PAGE, changePage)
    yield takeEvery(SEARCH_MOVIES, searchMovies)
}
