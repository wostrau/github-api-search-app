import React, {useEffect, useState} from 'react'
import s from './Github.module.css'
import axios from 'axios'


type SearchUserType = { login: string, id: number }
type SearchResultType = { items: SearchUserType[] }
type UserResultType = {
    login: string
    id: number
    avatar_url: string
    followers: number
}

export const Github = () => {
    const [selectedUser, setSelectedUser] = useState<SearchUserType | null>(null)
    const [userDetails, setUserDetails] = useState<UserResultType | null>(null)
    const [users, setUsers] = useState<SearchUserType[]>([])
    const [tempSearch, setTempSearch] = useState<string>('')
    const [finalSearch, setFinalSearch] = useState<string>('')

    useEffect(() => {
        if (selectedUser) document.title = selectedUser.login
    }, [selectedUser])
    useEffect(() => {
        axios
            .get<SearchResultType>(`https://api.github.com/search/users?q=${finalSearch}`)
            .then(res => setUsers(res.data.items))
    }, [finalSearch])
    useEffect(() => {
        if (!selectedUser) return
        axios
            .get<UserResultType>(`https://api.github.com/users/${selectedUser.login}`)
            .then(res => setUserDetails(res.data))
    }, [selectedUser])

    return (
        <div className={s.container}>
            <div>
                <div>
                    <input
                        placeholder={'search'}
                        onChange={event => setTempSearch(event.currentTarget.value)}
                    />
                    <button
                        onClick={() => setFinalSearch(tempSearch)}
                    >Find
                    </button>
                </div>
                <ul>
                    {users.map(u => {
                        return (
                            <li
                                key={u.id}
                                className={selectedUser?.login === u.login ? s.selected : ''}
                                onClick={() => setSelectedUser(u)}
                            >{u.login}</li>
                        )
                    })}
                </ul>
            </div>
            <div>
                {!!userDetails && <>
                    <h2>{userDetails.login}</h2>
                    <img
                        src={userDetails.avatar_url}
                        alt='userPhoto'
                        style={{width: '200px'}}
                    />
                    <div>userId: {userDetails.id}</div>
                    <div>followers: {userDetails.followers}</div>
                </>}

            </div>
        </div>
    )
}