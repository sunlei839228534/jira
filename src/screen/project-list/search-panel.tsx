/* @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react'
import { Form, Input, Select } from "antd"
import { useState } from "react"

export interface User {
  id: string,
  name: string,
  email: string,
  title: string,
  organization: string,
  token: string
}

interface SearchPanelProps {
  users: User[],
  param: {
    name: string,
    personId: string
  },
  setParam: (param: SearchPanelProps['param']) => void
}

export const SearchPanel = ({users,param,setParam}: SearchPanelProps) => {

  return <Form css={{marginBottom: '2rem'}} layout="inline">
    <Form.Item>
      <Input placeholder="项目名" type="text"  value={param.name} onChange={(e) => {
        setParam({
          ...param,
          name: e.target.value
        })
      }} />
    </Form.Item>
    <Form.Item>
    <Select value={param.personId} onChange={value => {
        setParam({
          ...param,
          personId: value
        })
      }}>
        <Select.Option value="">负责人</Select.Option>
        {
          users.map(user=> <option key={user.id} value={user.id}>{user.name}</option>)
        }
      </Select>
    </Form.Item>
  </Form>
}