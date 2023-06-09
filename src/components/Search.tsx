import React, {useEffect, useState} from 'react'
import {Button, Grid, Input, Paper} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'


type SearchPropsType = {
    value: string,
    onSubmit: (fixedValue: string) => void
}

export const Search: React.FC<SearchPropsType> = ({value, onSubmit}) => {
    const [tempSearch, setTempSearch] = useState<string>('')

    useEffect(() => setTempSearch(value), [value])

    return (
        <Grid item>
            <Paper
                elevation={3}
                style={{padding: '10px'}}
            >
            <Input
                placeholder={'search'}
                value={tempSearch}
                onChange={event => setTempSearch(event.currentTarget.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter') onSubmit(tempSearch)
                }}
            />
            <Button
                style={{marginLeft: '5px'}}
                onClick={() => onSubmit(tempSearch)}
                variant={'outlined'}
            >Find
                <SearchIcon
                    style={{paddingLeft: '5px'}}
                />
            </Button>
        </Paper>
        </Grid>
    )
}