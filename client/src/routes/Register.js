import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate()

  const [confirmPassword, setConfirmPassword] = useState()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    age: '',
    genderIdentity: 'other',
    genderInterest: 'everyone',
    city: '',
    country: '',
    password: '',
    email: '',
  })
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const value = e.target.value
    const name = e.target.name

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      if (formData.password !== confirmPassword) {
        setError('Passwords do not match!')
        return
      }

      const response = await axios.post('http://localhost:3005/register', {
        firstname: formData.firstName,
        lastname: formData.lastName,
        username: formData.userName,
        age: formData.age,
        genderIdentity: formData.genderIdentity,
        genderInterest: formData.genderInterest,
        city: formData.city,
        country: formData.country,
        password: formData.password,
        email: formData.email,
      })

      if (response.status === 201) {
        navigate('/home')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="gradient-custom">
      <h1 className="text-light landing-heading">Create an account</h1>
      <section className="vh-100">
        <div className="container py-6 h-50">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div className="card shadow-2-strong card-registration">
                <div className="card-body p-4 p-md-5 settings">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">
                    Registration Form
                  </h3>
                  <form onSubmit={onSubmit}>
                    <section style={{ width: '100%' }}>
                      <div className="row">
                        <div>
                          <div className="form-outline">
                            <label className="form-label" htmlFor="userName">
                              Username
                            </label>
                            <input
                              type="text"
                              id="user-name"
                              name="userName"
                              className="form-control form-control-lg"
                              value={formData.userName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <div className="form-outline">
                            <label className="form-label" htmlFor="email">
                              Email
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              className="form-control form-control-lg"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div>
                          <div className="form-outline">
                            <label className="form-label" htmlFor="password">
                              Password
                            </label>
                            <input
                              type="password"
                              id="passowrd"
                              name="password"
                              className="form-control form-control-lg"
                              value={formData.password}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <div className="form-outline">
                            <label className="form-label" htmlFor="password">
                              Repeat Password
                            </label>
                            <input
                              type="password"
                              id="password-check"
                              name="password-check"
                              className="form-control form-control-lg"
                              value={confirmPassword}
                              onChange={(e) =>
                                setConfirmPassword(e.target.value)
                              }
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div>
                          <div className="form-outline">
                            <label className="form-label" htmlFor="firstName">
                              First Name
                            </label>
                            <input
                              type="text"
                              id="first-name"
                              name="firstName"
                              className="form-control form-control-lg"
                              value={formData.firstName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <div className="form-outline">
                            <label className="form-label" htmlFor="lastName">
                              Last Name
                            </label>
                            <input
                              type="text"
                              id="last-name"
                              name="lastName"
                              className="form-control form-control-lg"
                              value={formData.lastName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div>
                          <div className="form-outline datepicker w-100">
                            <label htmlFor="age" className="form-label">
                              Age
                            </label>
                            <input
                              type="text"
                              id="age"
                              name="age"
                              className="form-control form-control-lg"
                              value={formData.age}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            htmlFor="gender-identity"
                            className="form-label"
                          >
                            Gender
                          </label>
                          <div className="multiple-input-container">
                            <input
                              type="radio"
                              id="male-gender-identity"
                              name="genderIdentity"
                              value="male"
                              checked={formData.genderIdentity === 'male'}
                              onChange={handleChange}
                            />
                            <label
                              htmlFor="male-gender-identity"
                              className="form-label"
                            >
                              Male
                            </label>
                            <input
                              type="radio"
                              id="female-gender-identity"
                              name="genderIdentity"
                              value="female"
                              checked={formData.genderIdentity === 'female'}
                              onChange={handleChange}
                            />
                            <label
                              htmlFor="female-gender-identity"
                              className="form-label"
                            >
                              Female
                            </label>
                            <input
                              type="radio"
                              id="other-gender-identity"
                              name="genderIdentity"
                              value="other"
                              checked={formData.genderIdentity === 'other'}
                              onChange={handleChange}
                            />
                            <label
                              htmlFor="other-gender-identity"
                              className="form-label"
                            >
                              Other
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div>
                          <div className="form-outline">
                            <label className="form-label" htmlFor="city">
                              City
                            </label>
                            <input
                              type="text"
                              name="city"
                              className="form-control form-control-lg"
                              value={formData.city}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <div className="form-outline">
                            <label className="form-label" htmlFor="country">
                              Country
                            </label>
                            <input
                              type="text"
                              name="country"
                              className="form-control form-control-lg"
                              value={formData.country}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <label htmlFor="gender-interest" className="form-label">
                          Show Me
                        </label>
                        <div className="multiple-input-container">
                          <input
                            type="radio"
                            id="male-gender-interest"
                            name="genderInterest"
                            value="male"
                            checked={formData.genderInterest === 'male'}
                            onChange={handleChange}
                          />
                          <label
                            htmlFor="male-gender-interest"
                            className="form-label"
                          >
                            Male
                          </label>
                          <input
                            type="radio"
                            id="female-gender-interest"
                            name="genderInterest"
                            value="female"
                            checked={formData.genderInterest === 'female'}
                            onChange={handleChange}
                          />
                          <label
                            htmlFor="female-gender-interest"
                            className="form-label"
                          >
                            Female
                          </label>
                          <input
                            type="radio"
                            id="everyone-gender-interest"
                            name="genderInterest"
                            value="everyone"
                            checked={formData.genderInterest === 'everyone'}
                            onChange={handleChange}
                          />
                          <label
                            htmlFor="everyone-gender-interest"
                            className="form-label"
                          >
                            Everyone
                          </label>
                        </div>
                      </div>

                      <div className="mt-4 pt-2">
                        <input
                          className="col btn btn-purple-moon btn-lg"
                          type="submit"
                          value="Submit"
                        />
                      </div>
                    </section>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Register
