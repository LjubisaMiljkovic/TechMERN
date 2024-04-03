import React, { useState } from 'react'
import Label from '../Label/Label'
import Input from '../Input/Input'
import './RegisterForm.scss'
import { IoEye, IoEyeOff } from "react-icons/io5";
import Button from '../Button/Button';
import { checkEmailValidation } from '../../utils/checkEmailValidation';
import { register } from '../../services/userService';
import { useDispatch } from 'react-redux';
import { showLoader } from '../../store/loader/loaderSlice';
import { toast } from 'react-toastify';
import { showLoginForm } from '../../store/loginRegister/loginRegisterSlice';
import { FaArrowRightLong } from "react-icons/fa6";

function RegisterForm() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isEmail, setIsEmail] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  const [isUsername, setIsUsername] = useState(true);
  const [data, setData] = useState({
    email: '',
    username: '',
    password: '',
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    const newData = { ...data };
    newData[id] = value;
    setData(newData);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    !data.email ? setIsEmail(false) : setIsEmail(true);
    !data.password ? setIsPassword(false) : setIsPassword(true);
    !data.username ? setIsUsername(false) : setIsUsername(true);
    !checkEmailValidation(data.email) ? setIsEmailValid(false) : setIsEmailValid(true);

    if (!data.email || !data.username || !data.password || !checkEmailValidation(data.email)) return;

    //Logika za slam=nje na bekend
    dispatch(showLoader(true))
    const res = await register(data);
    dispatch(showLoader(false))
    if (res.status === 'success') {
      toast.success(res.message)
      dispatch(showLoginForm())
    } else {
      toast.error(res.message)
    }
  }



  return (
    <>
      <div className="register-form-wrapper">
        <div className="content">
          <h3>Welcome to TechMern shop</h3>
          <p>If already have account please {' '}
            <span onClick={() => dispatch(showLoginForm())}>
              go to Login <FaArrowRightLong />
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className='register-form'>
          <div className="input-wrapper">
            <Label htmlFor='email' color={isEmail ? isEmailValid : isEmail}>
              {isEmail ? (isEmailValid ? 'Email' : 'Email is not valid') : 'Email is requier'}
            </Label>
            <Input type='text' id='email' placeholder='email@explain.com' onChange={handleChange} />
          </div>
          <div className="input-wrapper">
            <Label htmlFor='username' color={isUsername}>{isUsername ? 'Username' : 'User name is required'}</Label>
            <Input type='text' id='username' placeholder='Chose your username' onChange={handleChange}></Input>
          </div>
          <div className="input-wrapper">
            <Label htmlFor='password' color={isPassword}>
              {isPassword ? 'Password' : 'Password is requier'}
            </Label>
            <Input
              type={showPassword ? 'text' : 'password'}
              id='password'
              placeholder='Chose your password'
              onChange={handleChange}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <IoEyeOff /> : <IoEye />}
            </span>
          </div>
          <Button className='btn btn-primary'>Register</Button>
        </form>
      </div>
    </>
  )
}

export default RegisterForm