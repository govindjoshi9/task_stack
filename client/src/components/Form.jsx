import React, { useState } from 'react';

function Form() {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    phone: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    dob: '',
    email: '',
    phone: ''
  });

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const validate = () => {
    let nameError = '';
    let dobError = '';
    let emailError = '';
    let phoneError = '';

    if (!formData.name) {
      nameError = 'Name is required';
    }

    if (!formData.dob) {
      dobError = 'Date of birth is required';
    } else {
      const today = new Date();
      const dob = new Date(formData.dob);
      const age = today.getFullYear() - dob.getFullYear();
      if (age < 18) {
        dobError = 'Age must be 18 or older';
      }
    }

    if (!formData.email) {
      emailError = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      emailError = 'Email is invalid';
    }

    if (!formData.phone) {
      phoneError = 'Phone number is required';
    }

    if (nameError || dobError || emailError || phoneError) {
      setErrors({ nameError, dobError, emailError, phoneError });
      return false;
    }

    return true;
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const response = await fetch('http://localhost:8080/demo',{
      method: 'POST',
      body:JSON.stringify(formData),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    const data = await response.json()
    console.log(data);

    const isValid = validate();
    if (isValid) {
      console.log(formData);
      setFormData({
        name: '',
        dob: '',
        email: '',
        phone: ''
      });
      setErrors({
        name: '',
        dob: '',
        email: '',
        phone: ''
      });
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <div className="error">{errors.nameError}</div>

        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
        
        <div className="error">{errors.dobError}</div>

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div className="error">{errors.emailError}</div>

        <label htmlFor="phone">Phone Number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <div className="error">{errors.phoneError}</div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
