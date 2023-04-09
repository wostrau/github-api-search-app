import React, {useEffect, useState} from 'react'
import s from '../App.module.css'
import {Search} from './Search'
import {UsersList} from './UsersList'
import {UserDetails} from './UserDetails'
import {Button, Divider} from '@mui/material'
import RestartAltSharpIcon from '@mui/icons-material/RestartAltSharp'


export type SearchUserType = { login: string, id: number }
export const Github = () => {
    let initialValue = 'wostrau'
    const [finalSearch, setFinalSearch] = useState<string>(initialValue)
    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)

    useEffect(() => {
        if (selectedUser) document.title = selectedUser.login
    }, [selectedUser])

    return (
        <div className={s.container}>
            <div>

                <Search
                    value={finalSearch}
                    onSubmit={(fixedValue: string) => setFinalSearch(fixedValue)}
                />
                <Button
                    style={{margin: '5px'}}
                    onClick={() => {
                        setFinalSearch(initialValue)
                        setSelectedUser({login: initialValue, id: 29176361})
                    }}
                    color={'secondary'}
                    variant={'outlined'}
                >Reset
                    <RestartAltSharpIcon
                        style={{paddingLeft: '5px'}}
                    />
                </Button>
                <Divider/>
                <UsersList
                    term={finalSearch}
                    selectedUser={selectedUser}
                    onUserSelect={setSelectedUser}
                />

            </div>
            <div>
                {selectedUser && <UserDetails user={selectedUser}/>}
            </div>
        </div>
    )
}