import React, { useState, useEffect } from 'react'
import { createDepartment, getDepartmentById, updateDepartment } from '../services/DepartmentService.js'
import { useNavigate, useParams } from 'react-router-dom'

const DepartmentComponent = () => {

    const [departmentName, setDepartmentName] = useState('')
    const [departmentDescription, setDepartmentDescription] = useState('')
    const navigator = useNavigate();

    // This hook is to extract URL parameters from a router
    const { id } = useParams();

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Department</h2>
        } else {
            return <h2 className='text-center'>Add Department</h2>
        }
    }

    // Populate the data to update Department form
    useEffect(() => {
        if (id) {
            getDepartmentById(id).then((response) => {
                setDepartmentName(response.data.departmentName);
                setDepartmentDescription(response.data.departmentDescription);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    // Use to validate form data
    const [errors, setErrors] = useState({
        departmentName: '',
        departmentDescription: ''
    })

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (departmentName.trim()) {
            errorsCopy.departmentName = '';
        } else {
            errorsCopy.departmentName = 'Department name is required';
            valid = false;
        }

        if (departmentDescription.trim()) {
            errorsCopy.departmentDescription = '';
        } else {
            errorsCopy.departmentDescription = 'Department description is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function saveOrUpdateDepartment(e) {
        e.preventDefault();

        if (validateForm()) {
            const department = { departmentName, departmentDescription };
            console.log(department);

            // If id is present, perform update
            if (id) {
                updateDepartment(id, department).then((response) => {
                    console.log(response.data);
                    // to back the previous page
                    navigator('/departments')
                }).catch(error => {
                    console.error(error);
                })
            } else {
                // Perform create
                createDepartment(department).then((response) => {
                    console.log(response.data);
                    // to back the previous page
                    navigator('/departments')
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
                                <label className='form-label'>Department Name: </label>
                                <input
                                    type="text"
                                    placeholder='Enter Department Name'
                                    name='departmentName'
                                    value={departmentName}
                                    className={`form-control ${errors.departmentName ? 'is-invalid' : ''}`}
                                    onChange={(e) => setDepartmentName(e.target.value)} />
                                {errors.departmentName && <div className='invalid-feedback'>{errors.departmentName}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Department Description: </label>
                                <input
                                    type="text"
                                    placeholder='Enter Department Description'
                                    name='departmentDescription'
                                    value={departmentDescription}
                                    className={`form-control ${errors.departmentDescription ? 'is-invalid' : ''}`}
                                    onChange={(e) => setDepartmentDescription(e.target.value)} />
                                {errors.departmentDescription && <div className='invalid-feedback'>{errors.departmentDescription}</div>}
                            </div>
                            <button className='btn btn-success' onClick={saveOrUpdateDepartment}>Sumit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DepartmentComponent