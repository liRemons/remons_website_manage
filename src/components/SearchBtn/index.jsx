import { DeleteOutlined, SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd';
export default (props) => {
  const { form, add, reset,del } = props;
 
  const btnData = [
    { type: 'primary', htmlType: 'submit', icon: <SearchOutlined /> },
    { type: 'primary', icon: <ReloadOutlined />, onClick: reset },
    { type: 'primary', icon: <PlusOutlined />, onClick: add },
    { type: 'primary', danger: true, icon: <DeleteOutlined />,onClick:del },
  ]
  return <Space>
    {
      btnData.map((item, index) => <Button {...item} key={index}></Button>)
    }
  </Space>
}