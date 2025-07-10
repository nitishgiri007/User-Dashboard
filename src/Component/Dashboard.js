import React, { useState } from 'react';
import { Trash2, Edit, Save, X, Users, UserPlus } from 'lucide-react';

const UserDashboard = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      fname: 'Nitish',
      lname: 'Bharti',
      email: 'nb88640@gmail.com',
      mobile: '7488059189',
      password: 'password123'
    },
    {
      id: 2,
      fname: 'tesing',
      lname: 'data',
      email: 'tesing.data@check.com',
      mobile: '9876543210',
      password: 'password456'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    mobile: '',
    password: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fname.trim()) {
      newErrors.fname = 'First name is required';
    }
    
    if (!formData.lname.trim()) {
      newErrors.lname = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email format is invalid';
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(formData.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }
    
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    const emailExists = users.find(user => 
      user.email === formData.email && 
      (!editingUser || user.id !== editingUser.id)
    );
    if (emailExists) {
      newErrors.email = 'Email already exists';
    }
    
    const mobileNumberExist = users.find(user => user.mobile ===formData.mobile &&
      (!editingUser|| user.id !== editingUser.id) 
    )
    if(mobileNumberExist){
      newErrors.mobile = "Mobile number already exists"
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleInputChange = (e) => {
  const { name, value } = e.target;
  
  const processedValue = name === 'mobile' ? value.replace(/[^0-9]/g, '') : value;
  
  setFormData(prev => ({
    ...prev,
    [name]: processedValue
  }));
  
  if (errors[name]) {
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  }
};

  const handleAddUser = () => {
    if (validateForm()) {
      const newUser = {
        id: Date.now(),
        ...formData
      };
      setUsers([...users, newUser]);
      resetForm();
      setShowAddForm(false);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormData({
      fname: user.fname,
      lname: user.lname,
      email: user.email,
      mobile: user.mobile,
      password: user.password
    });
    setShowAddForm(true);
  };

  const handleUpdateUser = () => {
    if (validateForm()) {
      setUsers(users.map(user => 
        user.id === editingUser.id 
          ? { ...user, ...formData }
          : user
      ));
      resetForm();
      setShowAddForm(false);
      setEditingUser(null);
    }
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const resetForm = () => {
    setFormData({
      fname: '',
      lname: '',
      email: '',
      mobile: '',
      password: ''
    });
    setErrors({});
  };

  const cancelForm = () => {
    resetForm();
    setShowAddForm(false);
    setEditingUser(null);
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container">
        <div className="card mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <Users size={32} className="text-primary me-3" />
                <h1 className="mb-0 text-dark">User Dashboard</h1>
              </div>
              <div className="text-muted">
                <small>Total Users: {users.length}</small>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-end mb-4">
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-primary d-flex align-items-center"
          >
            <UserPlus size={20} className="me-2" />
            Add New User
          </button>
        </div>

        {showAddForm && (
          <div className="card mb-4">
            <div className="card-body">
              <h3 className="card-title mb-4">
                {editingUser ? 'Edit User' : 'Add New User'}
              </h3>
              <div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">First Name *</label>
                    <input
                      type="text"
                      name="fname"
                      value={formData.fname}
                      onChange={handleInputChange}
                      className={`form-control ${errors.fname ? 'is-invalid' : ''}`}
                      placeholder="Enter first name"
                    />
                    {errors.fname && (
                      <div className="invalid-feedback">{errors.fname}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Last Name *</label>
                    <input
                      type="text"
                      name="lname"
                      value={formData.lname}
                      onChange={handleInputChange}
                      className={`form-control ${errors.lname ? 'is-invalid' : ''}`}
                      placeholder="Enter last name"
                    />
                    {errors.lname && (
                      <div className="invalid-feedback">{errors.lname}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="Enter email address"
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Mobile *</label>
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className={`form-control ${errors.mobile ? 'is-invalid' : ''}`}
                      placeholder="Enter 10-digit mobile number"
                    />
                    {errors.mobile && (
                      <div className="invalid-feedback">{errors.mobile}</div>
                    )}
                  </div>

                  <div className="col-12 mb-3">
                    <label className="form-label">Password *</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      placeholder="Enter password (min 6 characters)"
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2">
                  <button
                    type="button"
                    onClick={cancelForm}
                    className="btn btn-secondary d-flex align-items-center"
                  >
                    <X size={16} className="me-2" />
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={editingUser ? handleUpdateUser : handleAddUser}
                    className="btn btn-success d-flex align-items-center"
                  >
                    <Save size={16} className="me-2" />
                    {editingUser ? 'Update User' : 'Add User'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="card">
          <div className="card-header bg-light">
            <h3 className="card-title mb-0">All Users</h3>
          </div>
          
          {users.length === 0 ? (
            <div className="card-body text-center py-5">
              <Users size={64} className="text-muted mb-3" />
              <h4 className="text-muted">No users found</h4>
              <p className="text-muted">Click "Add New User" to get started</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Mobile</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <strong>{user.fname} {user.lname}</strong>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="btn btn-outline-primary btn-sm d-flex align-items-center"
                            title="Edit user"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="btn btn-outline-danger btn-sm d-flex align-items-center"
                            title="Delete user"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;