import React, { useState } from 'react';
import { Form, Input, Button, Card, Checkbox, message, Divider, Typography } from 'antd';
import { UserOutlined, LockOutlined, GoogleOutlined, GithubOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Login = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      setIsAuthenticated(true); // Update auth state in parent
      message.success('Login successful!');
      navigate('/dashboard', { replace: true });
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: 20
    }}>
      <Card style={{ 
        width: '100%', 
        maxWidth: 400, 
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
        borderRadius: 12
      }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Title level={2} style={{ color: '#1890ff', margin: 0 }}>
            OKR Flow
          </Title>
          <Text type="secondary">Modern OKR & Kanban Platform</Text>
        </div>

        <Form
          name="login"
          initialValues={{ remember: true, email: 'admin@demo.com', password: 'password' }}
          onFinish={onFinish}
          size="large"
          layout="vertical"
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Checkbox>Remember me</Checkbox>
              <Button type="link" style={{ padding: 0 }}>Forgot password?</Button>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Log in
            </Button>
          </Form.Item>

          <Divider plain>or continue with</Divider>

          <div style={{ display: 'flex', gap: 16 }}>
            <Button icon={<GoogleOutlined />} block>
              Google
            </Button>
            <Button icon={<GithubOutlined />} block>
              GitHub
            </Button>
          </div>

          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <Text type="secondary">Don't have an account? </Text>
            <Button type="link" style={{ padding: 0 }}>Sign up</Button>
          </div>

          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Text type="secondary" style={{ fontSize: 12 }}>
              Demo credentials: admin@demo.com / password
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default Login;