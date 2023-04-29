import type {Meta, StoryObj} from '@storybook/react';

import {Button} from './Button';
import {AddItemForm, PropsType} from "../components/AddItemForm";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        callBack: {
            description: 'Button clicked inside form',
            action: 'clicked'
        }
    },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AddItemFormStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
};

export const AddItemFormWithErrorStory = (args:PropsType)=>{


        // The local stack for the input and the batton
        const [title, setTitle] = useState('')
        const [error, setError] = useState<string | null>('Title is required')

        // Function for the Button
        const onClickAddTaskHandler = () => {
            let newTitle = title.trim()
            if (newTitle !== '') {
                args.callBack(newTitle)
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
                {/*<Button style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}*/}
                {/*variant="contained" color='success' size='small' disableElevation*/}
                {/*onClick={onClickAddTaskHandler}>add</Button>*/}
            </div>
        );

};