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
let path;
const defaultOpenKeys = ({ pathname, data, father }) => {
  if (!Array.isArray(data)) return [];
  // for 循环可中断
  for (let i = 0; i < data.length; i++) {
    if (data[i].path === pathname) {
      path = data[i].path;
      if (father) path = father.path
      break;
    } else {
      defaultOpenKeys({ pathname, data: data[i].children, father: data[i] })
    }
  }
  if (path) return [path]
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
      defaultOpenKeys={defaultOpenKeys({ pathname, data: menuData })}
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