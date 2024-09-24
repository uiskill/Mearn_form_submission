import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const Registration = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        position: '',
        password: '',
        gender: '',
        confirm: false,
        nationality: '',
        mobile: '',
        qualification:"",
        city: '',
    });

    const [alertMessage, setAlertMessage] = useState({ type: '', message: '' });
    // Mapping for position values to names
    const positionMap = {
        jweb: "Junior Web Developer",
        sweb: "Senior Web Developer",
        pmanager: "Project Manager",
        dev: "Fullstack Developer",
        front: "FrontEnd Developer",
        java: "java Developer",
        react: "react Developer",
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };


    const handlePositionChange = (e) => {
        const positionValue = e.target.value;
        const positionName = positionMap[positionValue] || '';
        setFormData({
            ...formData,
            position: positionName,
        });
    };









    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/register', formData, {
                headers: { 'Content-Type': 'application/json' },
            });
            setAlertMessage({ type: 'success', message: 'Registration successful!' });
        } catch (error) {
            const errorMessage = error.response ? error.response.data.error : 'Something went wrong';
            setAlertMessage({ type: 'danger', message: errorMessage });
        }
    };

    return (
        <div>
            <div className="form-body">
                <div className="row">
                    <div className="form-holder">
                        <div className="form-content">
                            <div className="form-items">
                                <h3 className='text-center'>Register Today</h3>
                                <p className='text-center'>Fill in the data below.</p>

                                {/* Alert Message */}
                                {alertMessage.message && (
                                    <div className={`alert alert-${alertMessage.type}`} role="alert">
                                        {alertMessage.message}
                                    </div>
                                )}

                                <form className="requires-validation" onSubmit={handleSubmit}>
                                    <div className="col-md-12">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="name"
                                            placeholder="Full Name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-12 mt-3">
                                        <input
                                            className="form-control"
                                            type="email"
                                            name="email"
                                            placeholder="E-mail Address"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-md-12 mt-3">
                                        <input
                                            className="form-control"
                                            type="qualification"
                                            name="qualification"
                                            placeholder="Qualification"
                                            required
                                            value={formData.qualification}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-12 mt-3">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="mobile"
                                            placeholder="Mobile No"
                                            required
                                            value={formData.mobile}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-12 mt-3">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="city"
                                            placeholder="City"
                                            required
                                            value={formData.city}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-12 mt-3">
                                        <input
                                            className="form-control"
                                            type="text"
                                            name="nationality"
                                            placeholder="Nationality"
                                            required
                                            value={formData.nationality}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-12">
                                        <select
                                            className="form-select mt-3"
                                            name="position"
                                            required
                                            onChange={handlePositionChange}
                                        >
                                            <option selected disabled value="">
                                                Position
                                            </option>
                                            <option value="jweb">Junior Web Developer</option>
                                            <option value="sweb">Senior Web Developer</option>
                                            <option value="pmanager">Project Manager</option>
                                            <option value="dev">Fullstack Developer</option>
                                            <option value="front">FrontEnd Developer</option>
                                            <option value="java">java Developer</option>
                                            <option value="react">react Developer</option>


                                        </select>
                                    </div>

                                    <div className="col-md-12">
                                        <input
                                            className="form-control"
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            required
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div className="col-md-12 mt-3">
                                        <label className="mb-3 mr-1" htmlFor="gender">
                                            Gender:{' '}
                                        </label>
                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="gender"
                                            id="male"
                                            value="male"
                                            onChange={handleChange}
                                            required
                                        />
                                        <label className="btn btn-sm bg-primary" htmlFor="male">
                                            Male
                                        </label>

                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="gender"
                                            id="female"
                                            value="female"
                                            onChange={handleChange}
                                            required
                                        />
                                        <label className="btn btn-sm bg-primary" htmlFor="female">
                                            Female
                                        </label>

                                        <input
                                            type="radio"
                                            className="btn-check"
                                            name="gender"
                                            id="secret"
                                            value="secret"
                                            onChange={handleChange}
                                            required
                                        />
                                        <label className="btn btn-sm bg-primary" htmlFor="secret">
                                            Secret
                                        </label>
                                    </div>

                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id="invalidCheck"
                                            required
                                            name="confirm"
                                            checked={formData.confirm}
                                            onChange={handleChange}
                                        />{' '}
                                        Please accept Conditions
                                    </div>

                                    <div className="form-button mt-3">
                                        <button id="submit" type="submit" className="btn btn-primary">
                                            Register
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;
