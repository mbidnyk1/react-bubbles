import React, { useState } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const AddColorForm = ({ updateColors }) => {

    const [newColor, setNewColor] = useState(
        {
            color: "",
            code: {
              code: ""
            }  
        }
    )

    const handleChanges = e => {
        if(e.target.name === 'code'){
           setNewColor({...newColor.code,hex: e.target.value})   
        }
        setNewColor({...newColor,[e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        axiosWithAuth()
        .post('/api/colors', newColor)
        .then(res => {
            updateColors(res.data)
        })
        .catch(err => {
            console.log({err})
        })
    }
    return(
        <form onSubmit={handleSubmit}>
            <label htmlFor='color'>Enter Color:</label>
            <input
                id='color'
                type='text'
                name='color'
                value={newColor.color}
                onChange={handleChanges}
            />
            <label htmlFor='code'>Enter Hexcode:</label>
            <input
                id='code'
                type='text'
                name='code'
                value={newColor.code.hex}
                onChange={handleChanges}
            />
            <button>Add Color</button>
        </form>
    )
}

export default AddColorForm