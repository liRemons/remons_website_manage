import Search from '@components/Search'
import { Table, Button, Space, Form, Input, Card, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import AddOrEdit from './addOrEdit'
import { connect } from '@utils'
import actionCreators from '@store/content/actions'
function Article(props) {
  const [visible, setVisible] = useState(false);
  const handleOk = () => {

  }

  const add = () => {
    setVisible(true)
    // props.history.push({
    //   pathname:'/markdown',
    //   search:'url=/upload/markdown/React.md'
    // })
  }
  useEffect(() => {
  }, [])

  const itemData = [
    { name: 'name', label: "文章名称", childNode: <Input /> },
  ]
  const searchProps = {
    add, itemData
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

export default connect({ attr: "content", actionCreators })(Article)