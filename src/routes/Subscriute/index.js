import React, { useState } from 'react';
import { Subscriute as SubscriuteComponent } from '../../components/Subscriute';

export const Subscriute = () => {
  const [ email, setEmail ] = useState ('');
  const [ firstName, setfirstName ] = useState ('');
  const [ lastName, setLastName ] = useState ('');
  const [ status, setStatus ] = useState ('editing');

  const handleEmailChange = (e) => {
    setEmail(e.currentTarget.value);
  }

  const handleFirstNameChange = (e) => {
    setfirstName(e.currentTarget.value);
  }

  const handleLastNameChange = (e) => {
    setLastName(e.currentTarget.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const config = {
      body: JSON.stringify(
        {
          email: email,
          firstName: firstName,
          lastName: lastName,
        }),
      method: 'POST',
    };
    console.log(config)
    fetch('https://hooks.zapier.com/hooks/catch/3113594/k0li3h/', config)
      .then(() => {
        setEmail(''),
        setfirstName(''),
        setLastName(''),
        setStatus('success')
      })
      .catch((e) => {
        setEmail(''),
        setfirstName(''),
        setLastName(''),
        setStatus('error')
      })
  }

  return (
    <SubscriuteComponent
      email={ email }
      firstName={ firstName }
      lastName={ lastName }
      status={ status }
      handleEmailChange={ handleEmailChange }
      handleFirstNameChange={ handleFirstNameChange }
      handleLastNameChange={ handleLastNameChange }
      handleSubmit={ handleSubmit }
    />
  );
};
