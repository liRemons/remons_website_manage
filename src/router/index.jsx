import { Switch, Route, useHistory } from 'react-router-dom'
import { option } from './options'
import Layout from '@components/layout'
import { Suspense } from 'react'
import { Spin } from 'antd'
const routerOptions = [];
const initOption = (data) => {
  data.forEach(item => {
    if (item.meta.subMenu) {
      initOption(item.children)
    } else {
      routerOptions.push(item)
    }
  })
}
initOption(option)
const isPublicComOption = routerOptions.filter(item => !item.meta.isPublicCom);
const PublicComOption = routerOptions.filter(item => item.meta.isPublicCom);
const initRoute = (data) =>
  data.map(item =>
    <Route
      path={item.path}
      exact={item.path === '/'}
      key={item.path + 'route'}
      component={item.component}
    ></Route>
  )

export default function RouterEl() {
  const history = useHistory()
  const { location: { pathname } } = history
  const token = localStorage.token;
  // if (!token && pathname !== '/login') history.replace('/login')
  return (
    <Suspense fallback={<Spin tip="加载中..." size="large"></Spin>}>
      <Switch>
        {initRoute(PublicComOption)}
        <Layout>
          {initRoute(isPublicComOption)}
        </Layout>
      </Switch>
    </Suspense>
  )
}