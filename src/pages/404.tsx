import { Button, Result } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { routePath } from '~/routes/routePath'

const NotFoundPage: React.FC = () => (
  <Result
    status='404'
    title='404'
    subTitle='Sorry, the page you visited does not exist.'
    extra={
      <Link to={routePath.home}>
        <Button type='primary'>Back Home</Button>
      </Link>
    }
  />
)

export default NotFoundPage
