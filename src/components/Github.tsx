import React, {useEffect, useState} from 'react'
import s from './Github.module.css'
import axios from 'axios'


type SearchPropsType = { value: string, onSubmit: (fixedValue: string) => void }
export const Search: React.FC<SearchPropsType> = ({value, onSubmit}) => {
    const [tempSearch, setTempSearch] = useState<string>('')

    useEffect(() => setTempSearch(value), [value])

    return (
        <div>
            <input
                placeholder={'search'}
                value={tempSearch}
                onChange={event => setTempSearch(event.currentTarget.value)}
            />
            <button
                onClick={() => onSubmit(tempSearch)}
            >Find
            </button>
        </div>
    )
}


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
        <ul>
            {users.map(u => {
                return (
                    <li
                        key={u.id}
                        className={selectedUser?.login === u.login ? s.selected : ''}
                        onClick={() => onUserSelect(u)}
                    >{u.login}</li>
                )
            })}
        </ul>
    )
}


type TimerPropsType = {
    timerKey: string
    timerValue: number
    onChange: (actualSeconds: number) => void
}
export const Timer: React.FC<TimerPropsType> = ({timerValue, onChange, timerKey}) => {
    const [seconds, setSeconds] = useState(timerValue)

    useEffect(() => {
        setSeconds(timerValue)
    }, [timerValue])

    useEffect(() => onChange(seconds), [seconds])

    useEffect(() => {
        const intervalId = setInterval(() => {
            setSeconds((prevState) => prevState - 1)
        }, 1000)

        return () => clearInterval(intervalId)
    }, [timerKey])

    return <div>{seconds}</div>
}


type UserDetailsPropsType = { user: SearchUserType | null }
const startValue: number = 10
export const UserDetails: React.FC<UserDetailsPropsType> = ({user}) => {
    const [userDetails, setUserDetails] = useState<UserResultType | null>(null)
    const [seconds, setSeconds] = useState<number>(startValue)

    useEffect(() => {
        if (!user) return
        axios
            .get<UserResultType>(`https://api.github.com/users/${user.login}`)
            .then(res => {
                setSeconds(startValue)
                setUserDetails(res.data)
            })
    }, [user])

    useEffect(() => {
        if (seconds < 1) setUserDetails(null)
    }, [seconds])

    return (
        <div>

            {userDetails && <div>
                <Timer
                    timerValue={seconds}
                    onChange={setSeconds}
                    timerKey={userDetails.id.toString()}
                />
                <h2>user details:</h2>
                <img
                    src={userDetails.avatar_url}
                    alt="userPhoto"
                    style={{width: '200px'}}
                />
                <div>userId: {userDetails.id}</div>
                <div>followers: {userDetails.followers}</div>
            </div>}
        </div>
    )
}

type SearchUserType = { login: string, id: number }
type SearchResultType = { items: SearchUserType[] }
type UserResultType = {
    login: string
    id: number
    avatar_url: string
    followers: number
}

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
                <button
                    onClick={() => {
                        setFinalSearch(initialValue)
                        setSelectedUser({login: initialValue, id: 29176361})
                    }}
                >Reset
                </button>
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