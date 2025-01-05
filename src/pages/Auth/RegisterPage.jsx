import { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import axios from 'axios';
import '../../styles/Form.css';

const { Option } = Select;

const Register = () => {
  const [form] = Form.useForm(); // Create a form instance
  const [role, setRole] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);  
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const handleRoleChange = (value) => {
    setRole(value);
  };

  const handleSubmit = async (values) => {
    setError(null);
    setSuccess(null);

    try {
      await axios.post(`${API_URL}/register`, {
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password,
        password_confirmation: values.password_confirmation,
        role: values.role,
        emp_code: values.emp_code || null,
      });
      setSuccess('User registered successfully!');
      form.resetFields(); // Reset the form fields
      message.success('User registered successfully!');
    } catch (err) {
      setError(err.response.data.message || 'Registration failed.');
      message.error(err.response.data.message || 'Registration failed.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Register</h2>
        <Form form={form} onFinish={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          <Form.Item name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password placeholder="Password" />
          </Form.Item>
          <Form.Item name="password_confirmation" rules={[{ required: true, message: 'Please confirm your password!' }]}>
            <Input.Password placeholder="Confirm Password" />
          </Form.Item>
          <Form.Item name="role" rules={[{ required: true, message: 'Please select your role!' }]}>
            <Select placeholder="Select Role" onChange={handleRoleChange}>
              <Option value="admin">Admin</Option>
              <Option value="employee">Employee</Option>
            </Select>
          </Form.Item>
          {role === 'employee' && (
            <Form.Item name="emp_code" rules={[{ required: true, message: 'Please input your employee code!' }]}>
              <Input placeholder="Employee Code" />
            </Form.Item>
          )}
          <Form.Item>
            <Button type="primary" htmlType="submit" className="auth-button">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
