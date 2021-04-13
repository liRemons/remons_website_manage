import Select from '@components/Select'
import SearchBtn from '@components/SearchBtn'
import { Table, Button, Space, Form, Input, Card, Modal } from 'antd';
import { EditOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
const AdvancedSearchForm = (props) => {
  const { openModal } = props
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const add = () => {
    openModal({ type: 'add' })
  }

  const ItemData = [
    { name: 'name', label: "歌手名称", childNode: <Input /> },
  ]
  return (
    <Form
      form={form}
      name="advanced_search"
      onFinish={onFinish}
      layout='inline'
      size="small"
    >
      {
        ItemData.map(item =>
          <Form.Item key={item.name} name={item.name} label={item.label}>
            {item.childNode}
          </Form.Item>
        )
      }
      <SearchBtn form={form} {...props} add={add}></SearchBtn>
    </Form>
  );
};


function Author(props) {
  const { musicList } = props;
  const [visible, setVisible] = useState(false);
  const handleOk = () => {

  }
  const openModal = ({ type }) => {
    if (type === 'add') setVisible(true)

  }
  useEffect(() => {
  }, [])
  return <>
    <Card bordered={false} className="search">
      <AdvancedSearchForm {...props} openModal={openModal}></AdvancedSearchForm>
    </Card>
  </>
}

export default Author