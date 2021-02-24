import { Action } from 'redux'
import { IMovie } from '../../types'

export interface ILoadMoviesActionPayload {
    searchTerm: string
    page: number
}

export interface ILoadMoviesAction extends Action {
    type: string
    payload: ILoadMoviesActionPayload
}

export interface ILoadMoviesFailedAction extends Action {
    type: string
    payload: string
}

export interface ILoadMoviesSuccessActionPayload {
    movies: IMovie[]
    totalResults: number
}

export interface ILoadMoviesSuccessAction extends Action {
    type: string
    payload: ILoadMoviesSuccessActionPayload
}

export interface IChangePageAction extends Action {
    type: string
    payload: number
}

export interface ISearchMoviesAction extends Action {
    type: string
    payload: string
}

export interface IState {
    loading: boolean
    searchTerm: string
    page: number
    data: { movies: IMovie[]; totalResults: number }
    error?: string
}
