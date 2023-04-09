import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {Timer} from './Timer'
import {SearchUserType} from './Github'
import {Grid, Paper} from '@mui/material'

type UserResultType = {
    login: string
    id: number
    avatar_url: string
    followers: number
}
type UserDetailsPropsType = {
    user: SearchUserType | null
}


export const startValue: number = 10


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
        <Grid item>
            <Paper
                elevation={3}
                style={{padding: '10px'}}
            >
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
            </Paper>
        </Grid>
    )
}