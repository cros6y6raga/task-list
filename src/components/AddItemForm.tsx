import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";

type PropsType = {
    callBack: (title: string) => void
}

export const AddItemForm = (props: PropsType) => {

    // The local stack for the input and the batton
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    // Function for the Button
    const onClickAddTaskHandler = () => {
        let newTitle = title.trim()
        if (newTitle !== '') {
            props.callBack(newTitle)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    // Function for input
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    // Function for adding a task via Enter
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error) setError(null)
        if (e.key === 'Enter') {
            onClickAddTaskHandler()
        }
    }
    return (
        <div>
            <TextField style={{marginRight: '5px'}}
                       size={'small'}
                       variant='outlined'
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       error={!!error}
                       label={'Title'}
                       helperText={error}
            />
            <Button style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}
                    variant="contained" color='success' size='small' disableElevation
                    onClick={onClickAddTaskHandler}>add</Button>
        </div>
    );
};