import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "@mui/material";

type PropsType = {
    callBack: (title: string) => void
}

export const AddItemForm = (props: PropsType) => {

    // Локальный стейт для инпута и баттона
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    // Функция для баттона
    const onClickAddTaskHandler = () => {
        let newTitle = title.trim()
        if (newTitle !== '') {
            props.callBack(newTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    // Функция для инпута
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    // Функция для добавления таски через Enter
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            onClickAddTaskHandler()
        }
    }
    return (
        <div>
            <input className={error ? 'error' : ''}
                   value={title} onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   type="text"/>
            {/*<button className={'button-plus'} onClick={onClickAddTaskHandler}>+</button>*/}
            <Button variant="contained" color='success' size='small' onClick={onClickAddTaskHandler}>+</Button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};