import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import { searchMovies } from '../../modules/movies/actions'
import './SearchBar.scss'

const SearchBar = (): React.ReactElement => {
    const [value, setValue] = useState('')
    const dispatch = useDispatch()

    const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value)
    const handleOnKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') dispatch(searchMovies(value))
    }

    return (
        <div className="box">
            <SearchIcon className="icon" />
            <InputBase
                name="search-input"
                type="text"
                autoComplete="off"
                value={value}
                onChange={handleOnChange}
                onKeyPress={handleOnKeyPress}
                className="input"
            />
        </div>
    )
}

export default SearchBar
