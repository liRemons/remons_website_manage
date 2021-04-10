import { withRouter } from 'react-router-dom'
import React, { useState } from 'react'
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import styled from './index.module.less'
import Menu from './Menu'
const { Header, Sider, Content } = Layout;
function Slide(props) {
  const { history, children } = props
  const [collapsed, setCollapsed] = useState(false)
  return <Layout>
    <Sider style={{overflow:'auto'}} trigger={null} collapsible collapsed={collapsed}>
      <div className={styled.logo} onClick={() => history.replace('/')}>
        <img src={require('@assets/svg/head_logo.svg').default} alt="" />
      </div>
      <Menu {...props}></Menu>
    </Sider>
    <Layout>
      <Header className={styled.head}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: () => setCollapsed(!collapsed),
        })}
      </Header>
      <Content className={styled.content}>
        <div className={styled.main}>{children}</div>
      </Content>
    </Layout>
  </Layout>
}
export default withRouter(Slide)