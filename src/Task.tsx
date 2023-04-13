import React, {ChangeEvent, memo} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "./components/EditableSpan";
import {ITaskArray} from "./components/Tasklist";

type TaskPropsType = {
    task: ITaskArray
    checkedTask: (id: string, checked: boolean) => void
    editTask: (taskId: string, newTitle: string) => void
    removeTask: (id: string) => void
}

export const Task = memo(({
                         task,
                         checkedTask,
                         editTask,
                         removeTask
                     }: TaskPropsType) => {
    const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDone = e.currentTarget.checked
        checkedTask(task.id, newIsDone)
    }
    const removeTaskHandler = () => {
        removeTask(task.id)
    }
    const editTaskHandler = (tID: string, newTitle: string) => {
        editTask(task.id,newTitle)
    }
    return (
        <li  className={task.isDone ? 'is-done' : ''}>
            <IconButton onClick={removeTaskHandler} size={'small'} color={'error'}>
                <Delete/>
            </IconButton>
            <Checkbox checked={task.isDone} color={'primary'} onChange={onChangeChecked} size={'small'}/>
            <EditableSpan oldTitle={task.title}
                          callBack={(newTitle) => editTaskHandler(task.id, newTitle)}/>
        </li>
    );
});