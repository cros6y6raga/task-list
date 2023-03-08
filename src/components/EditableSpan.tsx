import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type PropsType = {
    oldTitle: string
    callBack: (newTitle: string) => void
}
export const EditableSpan = (props: PropsType) => {
    const [newTitle, setNewTitle] = useState(props.oldTitle)
    const [edit, setEdit] = useState(false)
    const editFooHandler = () => {
        setEdit(!edit)
        props.callBack(newTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    return (
        edit ?
            <TextField size={'small'}
                variant='standard'
                       value={newTitle}
                       onChange={onChangeHandler}
                       onBlur={editFooHandler}
                       autoFocus
            />
            //<input onChange={onChangeHandler} value={newTitle} onBlur={editFooHandler} autoFocus/>
            : <span onDoubleClick={editFooHandler}>{props.oldTitle}</span>
    );
};