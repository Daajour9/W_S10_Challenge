import React, { useState, useReducer} from 'react'
import { useCreatePizzaMutation } from '../state/pizzaApi'


export default function  PizzaForm  () {
  const [createPizza] = useCreatePizzaMutation()
  


const initialFormState = { // suggested
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}

const CHANGE_INPUT = 'CHANGE_INPUT'
const RESET_FORM = 'RESET_FORM'

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_INPUT: {
      const { name, value } = action.payload
      return { ...state, [name]: value }
    }
    case RESET_FORM:
      return initialFormState
    default:
      return state
  }
}
const [state, dispatch] = useReducer(reducer, initialFormState)
const onChange = ({ target: { name, value, type, checked } }) => {
  let newValue = type === "checkbox" ? checked : value;

  dispatch({ type: CHANGE_INPUT, payload: { name, newValue } })

};
const resetForm = () => {
  dispatch({ type: RESET_FORM })
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('handle submit',e)
    const newOrder = {  };
    console.log('newOrder', newOrder)
    console.log('state', state)
    // Send the new order to the API
    const response = await fetch('http://localhost:9009/api/pizza/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOrder),
    });

    if (response.ok) {
        const createdOrder = await response.json();
        (createPizza(createdOrder)); // Add order to Redux store
        // Clear form fields
        // setName('');
        // setSize('');
        // setToppings([]);

          
        // Reset the form fields
        resetForm(); // Call resetForm to clear the form
    } else {
        console.error('Failed to create order');
    }
  }

  
  return (
    <form>
      <h2>Pizza Form</h2>
      {true && <div className='pending'>Order in progress...</div>}
      {true && <div className='failure'>Order failed: fullName is required</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            onChange={onChange}
          value={state.fullName}

          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size"
           onChange={onChange}
           value={state.size}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          
          </select>
        
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" 
           onChange={onChange}
           checked={state['1']}
           />
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox"
           onChange={onChange}
           checked={state['2']}
           />
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" 
          onChange={onChange}
          checked={state['3']}/>
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" 
           onChange={onChange}
           checked={state['4']}/>
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" onChange={onChange}
          checked={state['5']} />
          Ham<br /></label>
      </div>
      <input  data-testid="submit" onClick={(e) => handleSubmit(e)} type="submit" />
      
    </form>
  )
  
}

