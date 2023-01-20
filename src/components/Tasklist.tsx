import React from 'react';

export const Tasklist = () => {
    return (
        <div>
            <h3>main</h3>
            <input type="text"/>
            <button>+</button>
            <ul>
                <li>
                    <input type="checkbox" checked={false}/>
                    <span>main</span>
                </li>
            </ul>
        </div>
    );
};