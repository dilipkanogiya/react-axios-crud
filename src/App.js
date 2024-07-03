import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import { useParams, useNavigate } from 'react-router-dom';

const App = () => {
    return (
        <Router>
            <div className="App container">
                <h1 className="my-3">React Axios CRUD</h1>
                <nav>
                    <Link to="/" className="btn btn-primary m-2">Home</Link>
                    <Link to="/add-user" className="btn btn-success m-2">Add User</Link>
                </nav>
                <Routes>
                    <Route exact path="/" element={<UserListPage />} />
                    <Route path="/add-user" element={<AddUserPage />} />
                    <Route path="/edit-user/:id" element={<EditUserPage />} />
                </Routes>
            </div>
        </Router>
    );
};

const UserListPage = () => {
    return <UserList />;
};

const AddUserPage = () => {
    const navigate = useNavigate();
    return <UserForm onSave={() => navigate('/')} />;
};

const EditUserPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    return <UserForm currentUser={{ id }} onSave={() => navigate('/')} />;
};

export default App;