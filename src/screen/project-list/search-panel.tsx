/* @jsxImportSource @emotion/react */
import { jsx } from '@emotion/react'
import { Form, Input, Select } from "antd"
import { useState } from "react"
import { IdSelect } from '../../components/id-select'
import { UserSelect } from '../../components/user-select'
import { Project } from './list'

export interface User {
  id: number,
  name: string,
  email: string,
  title: string,
  organization: string,
  token: string
}

interface SearchPanelProps {
  users: User[],
  param: Partial<Pick<Project, 'name' | 'personId'>>,
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
    <UserSelect key={'name'} defaultOptionName='负责人' options={users} value={param.personId} onChange={value => {
        setParam({
          ...param,
          personId: value
        })
      }}>
      </UserSelect>
    </Form.Item>
  </Form>
}