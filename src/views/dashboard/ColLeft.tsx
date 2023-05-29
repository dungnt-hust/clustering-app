import { Button, Input, Rate } from 'antd'
import { BiUserCircle } from 'react-icons/bi'
import { FaSort } from 'react-icons/fa'
import styled from 'styled-components'
import { data } from './data'

const ColLeft = () => {
  const handleSearch = () => {
    console.log('Search')
  }
  return (
    <Wrapper>
      <HeaderLeft>
        <Button type='primary' icon={<FaSort />}>
          Sort
        </Button>
        <Input.Search placeholder='Search...' onSearch={handleSearch} style={{ width: 400 }} />
      </HeaderLeft>

      <PersonList>
        {data.map((person, index) => {
          const renderAvatar = () => {
            if (person.avatar) {
              return <img src={person.avatar} alt='Avatar' />
            }
            return <BiUserCircle className='avatar-icon' />
          }

          return (
            <Person key={person.fullName + index}>
              {renderAvatar()}

              <PersonInfo>
                <div className='header'>
                  <h3 className='fullname'>{person.fullName}</h3>
                  <Rate allowHalf value={person.stars} disabled />
                </div>
                <p className='address'>{person.address}</p>
                <div className='other'>
                  <p className='age'>Age : {person.age}</p>
                  <p className='gender'>Gender : {person.gender}</p>
                </div>
              </PersonInfo>
            </Person>
          )
        })}
      </PersonList>
    </Wrapper>
  )
}

const Wrapper = styled.div``

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  & > button {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const PersonList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  max-height: 700px;
  overflow: auto;
`
const Person = styled.div`
  border: 1px solid;
  border-radius: 8px;
  display: flex;

  .avatar-icon {
    font-size: 80px;
  }
`

const PersonInfo = styled.div`
  flex: 1%;
  padding: 0 10px;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .other {
    display: flex;
    gap: 20px;
  }
`

export default ColLeft
