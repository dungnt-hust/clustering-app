import { UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select } from 'antd'
import styled from 'styled-components'

const ColRight = () => {
  return (
    <Wrapper>
      <Form className='form'>
        <Form.Item label='Age' colon labelCol={{}}>
          <Select
            // style={{ width: 120 }}
            defaultValue={'15'}
            options={Array(60)
              .fill(0)
              .map((item, index) => {
                const age = index + 15
                return {
                  value: age.toString(),
                  label: age.toString(),
                }
              })}
          />
        </Form.Item>
        <Form.Item label='Age' colon labelCol={{}}>
          <Select
            // style={{ width: 120 }}
            defaultValue={'15'}
            options={Array(60)
              .fill(0)
              .map((item, index) => {
                const age = index + 15
                return {
                  value: age.toString(),
                  label: age.toString(),
                }
              })}
          />
        </Form.Item>
        <Form.Item label='Fullname' colon labelCol={{}}>
          <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Fullname' />
        </Form.Item>
        <Form.Item label='Address' colon labelCol={{}}>
          <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Address' />
        </Form.Item>
        <Form.Item label='Phone Number' colon labelCol={{}}>
          <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Phone Number' />
        </Form.Item>
        <Form.Item label='Gender' colon labelCol={{}}>
          <Select
            // style={{ width: 120 }}
            defaultValue={'Male'}
            options={[
              {
                value: 'Male',
                label: 'Male',
              },
              {
                value: 'Female',
                label: 'Female',
              },
              {
                value: 'Other',
                label: 'Other',
              },
            ]}
          />
        </Form.Item>

        <Button type='primary'>Submit</Button>
      </Form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .ant-row.ant-form-item-row {
    display: flex;
    flex-direction: column;

    .ant-form-item-label {
      text-align: start;
    }
  }
`

export default ColRight
