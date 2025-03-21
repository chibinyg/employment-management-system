import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService.js'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllDepartments } from '../services/DepartmentService.js'

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [departmentId, setDepartmentId] = useState('')
    const [departments, setDepartments] = useState([])
    const navigator = useNavigate();

    // This hook is to extract URL parameters from a router
    const { id } = useParams();

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Employee</h2>
        } else {
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

    // Populate the department data 
    useEffect(() => {
        getAllDepartments().then((response) => {
            setDepartments(response.data);
        }).catch(error => {
            console.error(error);
        })
    }, [])

    // Populate the data to update Employee form
    useEffect(() => {
        if (id) {
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setDepartmentId(response.data.departmentId);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    // Use to validate form data
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: '',
    })

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (firstName.trim()) {
            errorsCopy.firstName = '';
        } else {
            errorsCopy.firstName = 'First name is required';
            valid = false;
        }

        if (lastName.trim()) {
            errorsCopy.lastName = '';
        } else {
            errorsCopy.lastName = 'Last name is required';
            valid = false;
        }

        if (email.trim()) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        if (departmentId) {
            errorsCopy.department = '';
        } else {
            errorsCopy.department = 'Select Department';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function saveOrUpdateEmploynee(e) {
        e.preventDefault();

        if (validateForm()) {
            const employee = { firstName, lastName, email, departmentId };
            console.log(employee);

            // If id is present, perform update
            if (id) {
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data);
                    // to back the previous page
                    navigator('/employees')
                }).catch(error => {
                    console.error(error);
                })
            } else {
                // Perform create
                createEmployee(employee).then((response) => {
                    console.log(response.data);
                    // to back the previous page
                    navigator('/employees')
                }).catch(error => {
                    console.error(error);
                })
            }
        }
    }

    return (
        <div className='container'>
            <br /><br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {/* // Dynamically change title */}
                    {pageTitle()}
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>First Name: </label>
                                <input
                                    type="text"
                                    placeholder='Enter Employee First Name'
                                    name='firstName'
                                    value={firstName}
                                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setFirstName(e.target.value)} />
                                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Last Name: </label>
                                <input
                                    type="text"
                                    placeholder='Enter Employee Last Name'
                                    name='lastName'
                                    value={lastName}
                                    className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setLastName(e.target.value)} />
                                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Email: </label>
                                <input
                                    type="text"
                                    placeholder='Enter Employee Email'
                                    name='email'
                                    value={email}
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    onChange={(e) => setEmail(e.target.value)} />
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Select department: </label>
                                <select
                                    className={`form-control ${errors.department ? 'is-invalid' : ''}`}
                                    value={departmentId}
                                    onChange={(e) => setDepartmentId(e.target.value)}
                                >
                                    <option value="Select Department">Select Department</option>
                                    {
                                        departments.map(department =>
                                            <option key={department.id} value={department.id}>{department.departmentName}</option>
                                        )
                                    }
                                </select>
                                {errors.department && <div className='invalid-feedback'>{errors.department}</div>}
                            </div>
                            <button className='btn btn-success' onClick={saveOrUpdateEmploynee}>Sumit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeComponent