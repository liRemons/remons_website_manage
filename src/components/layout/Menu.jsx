import { Menu } from 'antd'
import { Fragment } from 'react'
import { isPublicComOption } from '@router/options.js'
const { Item, SubMenu } = Menu
// 处理菜单数据,因为只有两层，所以没用递归
const menuData = isPublicComOption.map(item => {
  const { path, children, title, icon } = item;
  if (item.meta.subMenu) {
    return { type: 'subMenu', path, children, title, icon }
  } else {
    return { type: 'menu', path, title, icon }
  }
})
// 渲染 item
const MenuItem = (data) => data.map(item => {
  const { path, icon, title } = item;
  return <Item key={path} icon={icon}>{title}</Item>
}
)

// 刷新时赋值默认展开，返回一个数组
const defaultOpenKeys = ({ name, data, father }) => {
  if (!(data instanceof Array)) return []
  let path, children;
  path = data.find(item => item.path === name)?.path;
  if (!path) {
    data.forEach((item) => {
      if (item.type === 'subMenu') {
        children = item.children
        father = item
      }
    })
  }
  path && father && (path = father.path);
  return path ? [path] : defaultOpenKeys({ name, data: children, father })
}


function MenuComponent(props) {
  const { location: { pathname } } = props;
  const changeMenu = ({ key }) => {
    const { history } = props;
    history.replace(key)
  }
  return <>
    <Menu
      theme="dark"
      mode="inline"
      defaultOpenKeys={defaultOpenKeys({ name: pathname, data: menuData })}
      defaultSelectedKeys={[pathname]}
      onClick={changeMenu}
    >
      {
        menuData.map((item, index) =>
          <Fragment key={index}>
            {item.type === 'subMenu' ?
              <SubMenu key={item.path} title={item.title} icon={item.icon}>
                {MenuItem(item.children)}
              </SubMenu>
              : MenuItem([item])}
          </Fragment>
        )
      }
    </Menu></>
}
export default MenuComponent