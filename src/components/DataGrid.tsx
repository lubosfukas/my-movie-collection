import React from 'react'
import { DataGrid as PlainDataGrid, ColDef, PageChangeParams, RowSelectedParams } from '@material-ui/data-grid'

import { styled } from '../styled'
import { IMovie } from '../types'

interface IProps {
    rows: IMovie[]
    rowCount: number
    columns: ColDef[]
    page: number
    pageSize?: number
    height?: string
    checkboxSelection?: boolean
    handlePageChange?: (param: PageChangeParams) => void
    handleSelectionChange?: (param: RowSelectedParams) => void
}

const Wrapper = styled.div<{ height?: string }>`
    height: ${({ height }) => height || '630px'};
    width: 100%;
`

const DataGrid: React.FC<IProps> = ({
    height,
    rows,
    rowCount,
    columns,
    page,
    handlePageChange,
    handleSelectionChange,
    pageSize = 10,
    checkboxSelection = false
}) => {
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
                onRowSelected={handleSelectionChange}
                checkboxSelection={checkboxSelection}
            />
        </Wrapper>
    )
}

export default DataGrid
