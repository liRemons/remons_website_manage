
import { useState, useEffect } from 'react'
import { Button } from 'antd'
import { LogoutOutlined } from '@ant-design/icons';
import styled from './index.module.less'
import { isPublicComOption } from '@router/options.js'
function Home(props) {
  const { history } = props;
  const homeBtn = [
    { icon: require('@assets/svg/home_music.svg').default, title: "音乐" },
    { icon: require('@assets/svg/home_discuss.svg').default, title: "音乐" },
    { icon: require('@assets/svg/home_manage.svg').default, title: "音乐" }
  ]
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
      {homeBtn.map((item, index) =>
        <div key={index} className={styled.box} onClick={changeRouter}>
          <img src={item.icon} alt="" />
        </div>
      )}

      {/* 永远相信美好的事情即将发生
      <div className={styled.enter}>
        <Button
          type="primary"
          shape="round"
          size="large"
          onClick={changeRouter}
        >立即进入 <LogoutOutlined /></Button>
      </div> */}
    </div>
  </>
}

export default Home

