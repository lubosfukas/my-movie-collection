import React, { useState, useContext, useEffect } from 'react'
import { InputBase } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import { MovieContext } from '../../App'
import { useDebounce } from '../../hooks'
import './SearchBar.scss'

const SearchBar = (): React.ReactElement => {
    const [value, setValue] = useState('')
    const movieContext = useContext(MovieContext)

    if (!movieContext) {
        throw new Error('useCount must be used within a CountProvider')
    }

    const { setSearchTerm } = movieContext
    const debouncedSearchTerm: string = useDebounce<string>(value, 500)

    useEffect(() => {
        if (debouncedSearchTerm) setSearchTerm(debouncedSearchTerm)
    }, [debouncedSearchTerm, setSearchTerm])

    const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value)

    return (
        <div className="box">
            <SearchIcon className="icon" />
            <InputBase
                name="search-input"
                type="text"
                autoComplete="off"
                value={value}
                onChange={handleOnChange}
                className="input"
            />
        </div>
    )
}

export default SearchBar
