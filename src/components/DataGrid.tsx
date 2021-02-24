import React from 'react'
import { DataGrid as PlainDataGrid, ColDef, PageChangeParams } from '@material-ui/data-grid'

import { styled } from '../styled'
import { IMovie } from '../types'

interface IProps {
    rows: IMovie[]
    rowCount: number
    columns: ColDef[]
    page: number
    pageSize?: number
    height?: string
    handlePageChange: (params: PageChangeParams) => void
}

const Wrapper = styled.div<{ height?: string }>`
    height: ${({ height }) => height || '630px'};
    width: 100%;
`

const DataGrid: React.FC<IProps> = ({ height, rows, rowCount, columns, page, handlePageChange, pageSize = 10 }) => {
    return (
        <Wrapper height={height}>
            <PlainDataGrid
                rows={rows}
                rowCount={rowCount}
                columns={columns}
                pagination
                page={page}
                pageSize={pageSize}
                paginationMode="server"
                onPageChange={handlePageChange}
                checkboxSelection
            />
        </Wrapper>
    )
}

export default DataGrid
