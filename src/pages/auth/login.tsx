import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Container from '~/layouts/components/Container'
import { routePath } from '~/routes/routePath'

const LoginPage = () => {
  const handleSubmitForm = () => {
    console.log('Login')
  }
  return (
    <Wrapper>
      <Container className='container'>
        <Form
          name='normal_login'
          className='login-form'
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmitForm}
        >
          <h1 className=''>Login</h1>
          <Form.Item
            name='username'
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Password' />
          </Form.Item>
          <Form.Item className='form-item-remember'>
            <Form.Item name='remember' valuePropName='checked' noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link to={routePath.forgotPassword} className='login-form-forgot'>
              Forgot password
            </Link>
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' className='login-form-button'>
              Log in
            </Button>
            Or <Link to={routePath.register}>register now!</Link>
          </Form.Item>
        </Form>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  & > .container {
    max-width: 600px;
    margin: 0 auto;
  }

  a {
    text-decoration: underline;
  }

  .form-item-remember {
    .ant-form-item-control-input-content {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
  }
  .login-form-button {
    width: 100%;
  }
`

export default LoginPage
