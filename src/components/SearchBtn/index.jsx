import { DeleteOutlined, SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Space } from 'antd';
export default (props) => {
  const { form, add } = props;
  const btnData = [
    { type: 'primary', htmlType: 'submit', icon: <SearchOutlined />, onClick: () => { form.resetFields() } },
    { type: 'primary', icon: <ReloadOutlined /> },
    { type: 'primary', icon: <PlusOutlined />, onClick: add },
    { type: 'primary', danger: true, icon: <DeleteOutlined /> },
  ]
  return <Space>
    {
      btnData.map((item, index) => <Button {...item} key={index}></Button>)
    }
  </Space>
}