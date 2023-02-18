import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type PropsType = {
    callBack: (todolistID: string, title: string) => void
    todolistID:string
}

export const AddItemForm = (props:PropsType) => {
    // Локальный стейт для инпута и баттона
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    // Функция для баттона
    const onClickAddTaskHandler = () => {
        if (title.trim() !== '') {
            props.callBack(props.todolistID, title.trim())
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
            <button className={'button-plus'} onClick={onClickAddTaskHandler}>+</button>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};