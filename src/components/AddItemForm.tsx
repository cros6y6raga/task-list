import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";

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
            {/*<input className={error ? 'error' : ''}*/}
            {/*       value={title} onChange={onChangeHandler}*/}
            {/*       onKeyDown={onKeyDownHandler}*/}
            {/*       type="text"/>*/}
            <TextField size={'small'}
                       variant='outlined'
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       className={error ? 'error' : ''}/>
            {/*<button className={'button-plus'} onClick={onClickAddTaskHandler}>+</button>*/}
            <Button style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}
                    variant="contained" color='success' size='small' disableElevation
                    onClick={onClickAddTaskHandler}>add</Button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};