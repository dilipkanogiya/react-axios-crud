import React, { useState, useEffect } from 'react';
import { addUser, updateUser, getUser } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const UserForm = ({ currentUser, onSave }) => {
    const [user, setUser] = useState({ name: '', email: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchUser(id);
        }
    }, [id]);

    const fetchUser = async (id) => {
        try {
            const response = await getUser(id);
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (user.id) {
                await updateUser(user.id, user);
            } else {
                await addUser(user);
            }
            onSave(); // Navigate back to user list
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="m-3">
            <div className="mb-3">
                <label className="form-label">Name:</label>
                <input type="text" name="name" value={user.name} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
                <label className="form-label">Email:</label>
                <input type="email" name="email" value={user.email} onChange={handleChange} className="form-control" required />
            </div>
            <div className="mb-3">
                <label className="form-label">Phone:</label>
                <input type="text" name="phone" value={user.phone} onChange={handleChange} className="form-control" required />
            </div>
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" onClick={() => navigate('/')} className="btn btn-secondary ms-2">Cancel</button>
        </form>
    );
};

export default UserForm;