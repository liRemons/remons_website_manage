import Search from '@components/Search'
import { Table, Button, Space, Form, Input, Card, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import AddOrEdit from './addOrEdit'
function Article(props) {
  const [visible, setVisible] = useState(false);
  const handleOk = () => {

  }

  const add = () => {
    setVisible(true)
  }
  useEffect(() => {
  }, [])

  const itemData = [
    { name: 'name', label: "文章名称", childNode: <Input /> },
  ]
  const searchProps = {
    add,itemData
  }
  return <>
    <Search {...searchProps}></Search>
    <Modal
      title="Basic Modal"
      visible={visible}
      footer={null}
      onCancel={() => setVisible(false)}
      width="100%"
      style={{ top: 0 }}
      destroyOnClose={true}
    >
      <AddOrEdit {...props}></AddOrEdit>
    </Modal>
  </>
}

export default Article