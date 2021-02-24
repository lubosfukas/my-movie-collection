import React, { useState } from 'react'
import { TextField } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

import { styled } from '../styled'

interface IProps {
    onSubmit: (searchTerm: string) => void
}

const Wrapper = styled.div`
    width: 250px;
    margin-bottom: 30px;
    padding: 10px 10px 20px 30px;
    border-width: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.color.gray};
    border-radius: 5px;
`

const SearchBar: React.FC<IProps> = ({ onSubmit }) => {
    const [value, setValue] = useState('')

    const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setValue(event.target.value)
    const handleOnClick = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>) => onSubmit(value)

    return (
        <Wrapper>
            <TextField
                id="standard-search"
                label="Search field"
                type="search"
                value={value}
                onChange={handleOnChange}
            />
            <IconButton aria-label="search" disabled={!value} onClick={handleOnClick} style={{ marginLeft: '10px' }}>
                <SearchIcon />
            </IconButton>
        </Wrapper>
    )
}

export default SearchBar
