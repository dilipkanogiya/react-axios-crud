import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser } from '../services/api';

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            fetchUsers(); // Refresh the user list
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="m-3">
            <h2>User List</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>
                                <p className='mb-0'><b>Email: </b>{user.email}</p>
                                <b>Phone: </b>{user.phone}
                            </td>
                            <td>
                                <Link to={`/edit-user/${user.id}`} className="btn btn-warning btn-sm">Edit</Link>
                                <button onClick={() => handleDelete(user.id)} className="btn btn-danger btn-sm ms-2">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;