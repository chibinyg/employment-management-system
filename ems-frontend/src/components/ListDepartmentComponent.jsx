import React, { useEffect, useState } from 'react'
import { getAllDepartments, deleteDepartment } from '../services/DepartmentService.js';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

const ListDepartmentComponent = () => {

    const [departments, setDepartments] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
        listAllDepartments();
    }, [])

    function listAllDepartments() {
        getAllDepartments().then((response) => {
            console.log(response.data);
            setDepartments(response.data);
        }).catch(error => {
            console.error(error);
        })
    }

    // Use backtick `` to pass id
    function updateDepartment(id) {
        navigator(`/edit-department/${id}`);
    }

    function removeDepartment(id) {
        console.log(id);

        deleteDepartment(id).then((response) => {
            listAllDepartments();
        }).catch(error => {
            console.error(error);
        })
    }

    return (
        <div>
            <div className='container'>
                <h2 className='text-center'>List of Departments</h2>
                <Link className='btn btn-primary mb-2' to='/add-department'>Add Department</Link>
                <table className='table table-striped table-bordered'>
                    <thead>
                        <tr>
                            <th>Department Id</th>
                            <th>Deparment Name</th>
                            <th>Department Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            departments.map(department =>
                                <tr key={department.id}>
                                    <td>{department.id}</td>
                                    <td>{department.departmentName}</td>
                                    <td>{department.departmentDescription}</td>
                                    <td>
                                        <button className='btn btn-info' onClick={() => updateDepartment(department.id)}>Update</button>
                                        <button className='btn btn-danger' style={{ marginLeft: '10px' }} onClick={() => removeDepartment(department.id)}>Delete</button>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListDepartmentComponent