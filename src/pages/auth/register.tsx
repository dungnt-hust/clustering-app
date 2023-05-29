import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input } from 'antd'
import { AiTwotoneMail } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Container from '~/layouts/components/Container'
import { routePath } from '~/routes/routePath'

const RegisterPage = () => {
  const handleSubmitForm = () => {
    console.log('Register')
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
          <h1 className=''>Register</h1>
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
            name='email'
            rules={[
              {
                required: true,
                message: 'Please input your Email!',
              },
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
            ]}
          >
            <Input prefix={<AiTwotoneMail className='site-form-item-icon' />} placeholder='Email' />
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

          <Form.Item
            name='rePassword'
            rules={[
              {
                required: true,
                message: 'Please input your Re-Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Re-Password'
            />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' className='register-form-button'>
              Register
            </Button>
            Or <Link to={routePath.login}>Login now!</Link>
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

  .register-form-button {
    width: 100%;
  }
`

export default RegisterPage
