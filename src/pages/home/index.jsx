
import { useState, useEffect } from 'react'
import { Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons';
import Earth from './earth'
import styled from './index.module.less'
import { isPublicComOption } from '@router/options.js'
function Home(props) {
  const { history } = props;
  const changeRouter = () => {
    if (isPublicComOption[0].meta.subMenu) {
      history.replace(isPublicComOption[0].children[0].path)
    } else {
      history.replace(isPublicComOption[0].path)
    }
  }

  //  console.log(props);
  return <>
    <div className={styled.main}>
      永远相信美好的事情即将发生
      <div className={styled.enter}>
        <Button
          type="primary"
          shape="round"
          size="large"
          onClick={changeRouter}
        >立即进入 <LogoutOutlined /></Button>
      </div>

    </div>
    <Earth></Earth>
  </>
}

export default Home

