import React, {useEffect, useState} from 'react'
import axios from 'axios'
import s from '../App.module.css'
import {SearchUserType} from './Github'
import {Grid, List, ListItem, ListItemText, Paper} from '@mui/material'


type SearchResultType = { items: SearchUserType[] }
type UsersListPropsType = {
    term: string
    selectedUser: SearchUserType | null
    onUserSelect: (user: SearchUserType) => void
}


export const UsersList: React.FC<UsersListPropsType> = ({term, selectedUser, onUserSelect}) => {
    const [users, setUsers] = useState<SearchUserType[]>([])

    useEffect(() => {
        axios
            .get<SearchResultType>(`https://api.github.com/search/users?q=${term}`)
            .then(res => setUsers(res.data.items))
    }, [term])

    return (
        <Grid item>
            <Paper
                elevation={3}
                style={{padding: '10px', height: '70vh'}}
            >
            <List>
                {users.map(u => {
                    return (
                        <ListItem
                            key={u.id}
                            //className={selectedUser?.login === u.login ? s.selected : ''}
                            selected={selectedUser?.login === u.login}
                            onClick={() => onUserSelect(u)}
                            disablePadding
                            divider
                        >
                            <ListItemText primary={`user: ${u.login}`}/>
                        </ListItem>
                    )
                })}
            </List>
            </Paper>
        </Grid>
    )
}