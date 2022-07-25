import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if (action.type === 'user_input') {

    return { value: action.val, isValid: action.val.includes('@') }
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value, isValid: state.val.includes('@')
    }
  }
  return {
    value: '',
    isValid: null,
  }
};

const passwordReducer = (state, action) => {

  if(action.type === 'user_input'){
    return {
      value: action.val , isValid: action.val > 6

    }
  }

  if(action.type === 'INPUT_BLUR'){
    return { value: state.value , isValid: state.val.length >6 }
  }
  

  return {
    value: '',
    isValid: null,

  }

};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  })


  // useEffect( ()=>{
  //   const identifier= setTimeout( ()=>{
  //     console.log('checking validity');
  //     setFormIsValid(
  //       enteredEmail.includes('@') && enteredPassword.trim().length > 6
  //     );

  //   } ,500)

  //   return ()=>{
  //     clearTimeout(identifier);
  //     console.log('clean up');
  //   } //anonymous cleanup function


  // },[ enteredEmail, enteredPassword] );

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'user_input', val: event.target.value })
    // setEnteredEmail(event.target.value);

    setFormIsValid(
      event.target.value.includes('@') && passwordState.value.trim().length > 6
    );

  };

  const passwordChangeHandler = (event) => {
    dispatchPassword( {type: 'user_input', val: event.target.value} )
    // setEnteredPassword(event.target.value);

    setFormIsValid(
      // event.target.value.trim().length > 6 && enteredEmail.includes('@')
      emailState.isValid && event.target.value.trim().length > 6
    );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
    // setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    dispatchPassword( {type: 'INPUT_BLUR'} )
    // setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
