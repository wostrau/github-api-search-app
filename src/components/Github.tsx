import React, {useEffect, useState} from 'react'
import s from './Github.module.css'
import axios from 'axios'


type SearchUserType = { login: string, id: number }
type SearchResultType = { items: SearchUserType[] }

export const Github = () => {
    const [selectedUser, setSelectedUser] = useState<string | null>(null)
    const [users, setUsers] = useState<SearchUserType[]>([])

    useEffect(() => {
        if (selectedUser) document.title = selectedUser
    }, [selectedUser])

    useEffect(() => {
        axios
            .get<SearchResultType>('https://api.github.com/search/users?q=it-kamasutra')
            .then(res => setUsers(res.data.items))
    }, [])

    return (
        <div className={s.container}>
            <div>
                <div>
                    <input placeholder={'search'}/>
                    <button>Find</button>
                </div>
                <ul>
                    {users.map(u => {
                        return (
                            <li
                                key={u.id}
                                className={selectedUser === u.login ? s.selected : ''}
                                onClick={() => setSelectedUser(u.login)}
                            >{u.login}</li>
                        )
                    })}
                </ul>
            </div>
            <div>
                <h2>Username</h2>
                <div>Details</div>
            </div>
        </div>
    )
}