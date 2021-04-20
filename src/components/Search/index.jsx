import { Button, Space, Form, Input, Card, } from 'antd';
import FormItem from '@components/FormItem'
import { DeleteOutlined, SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons'

function Search(props) {
  const [form] = Form.useForm();
  const { onFinish, itemData, del, add, reset } = props;
  const formReset = () => {
    form.resetFields()
    reset()
  }
  const btnData = [
    { type: 'primary', htmlType: 'submit', icon: <SearchOutlined /> },
    { type: 'primary', icon: <ReloadOutlined />, onClick: formReset },
    { type: 'primary', icon: <PlusOutlined />, onClick: add },
    { type: 'primary', danger: true, icon: <DeleteOutlined />, onClick: del },
  ]

  const formProps = {
    form, name: 'search', onFinish: val => onFinish(val), layout: 'inline', size: 'mini'
  }

  return (
    <Card bordered={false}>
      <Form {...formProps}>
        <FormItem itemData={itemData}></FormItem>
        <Space>{btnData.map((item, index) => <Button {...item} key={index}></Button>)}</Space>
      </Form>
    </Card>
  )

}

export default Search