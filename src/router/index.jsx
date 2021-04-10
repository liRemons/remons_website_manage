import { Switch, Route } from 'react-router-dom'
import { option } from './options'
import Layout from '@components/layout'
const isPublicComOption = option.filter(item => !item.meta.isPublicCom);
const PublicComOption = option.filter(item => item.meta.isPublicCom);
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
  return (
    <Switch>
      {initRoute(PublicComOption)}
      <Layout>
        {initRoute(isPublicComOption)}
      </Layout>
    </Switch>
  )
}