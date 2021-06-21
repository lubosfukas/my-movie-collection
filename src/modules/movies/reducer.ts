/* eslint-disable @typescript-eslint/no-explicit-any */
import { CHANGE_PAGE, LOAD_MOVIES, LOAD_MOVIES_FAILED, LOAD_MOVIES_SUCCESS, SEARCH_MOVIES } from './actionTypes'
import { IState } from './types'

const initialState = {
    loading: false,
    searchTerm: '',
    page: 0,
    data: { movies: [], totalResults: 0 },
    error: undefined
}

const reducer = (state: IState = initialState, action: { type: string; payload: any }): IState => {
    switch (action.type) {
        case LOAD_MOVIES: {
            return {
                ...state,
                loading: true,
                searchTerm: action.payload.searchTerm,
                page: action.payload.page
            }
        }

        case LOAD_MOVIES_FAILED: {
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }

        case LOAD_MOVIES_SUCCESS: {
            const newData = { ...action.payload, movies: [...state.data.movies, ...action.payload.movies] }

            return {
                ...state,
                loading: false,
                error: undefined,
                data: newData
            }
        }

        case CHANGE_PAGE: {
            return {
                ...state,
                page: action.payload
            }
        }

        case SEARCH_MOVIES: {
            return {
                ...initialState,
                searchTerm: action.payload
            }
        }

        default:
            return state
    }
}

export default reducer
