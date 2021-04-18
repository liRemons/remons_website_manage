import { Table, Button, Space, Form, Input, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Select from '@components/Select'
import { useState } from 'react'
export default (props) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([])
  const onFinish = (val) => {

  }



  const uploadProps = {
    name: 'file',
    action: '/api/song/uploadMusicFile',
    onChange({ file, fileList }) {
      console.log(file);
      setFileList(fileList)
    },
  };


  const ItemData = [
    { name: 'name', label: "歌曲名", childNode: <Input /> },
    { name: 'authorId', label: "歌手", childNode: <Select placeholder="请选择歌手" dataSource={[]} allowClear /> },
    { name: 'collecttionId', label: "专辑", childNode: <Select placeholder="请选择专辑" dataSource={[]} allowClear /> },
    {
      name: 'file', label: "专辑封面", childNode:
        <Upload
          {...uploadProps}
          fileList={fileList}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>,
    },
  ]
  const formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };
  return <>
    <Form
      form={form}
      {...formItemLayout}
      name="edit"
      onFinish={onFinish}
      size="small"
      labelAlign="right"
    >
      {
        ItemData.map(item =>
          <Form.Item key={item.name} name={item.name} label={item.label}>
            {item.childNode}
          </Form.Item>
        )
      }
      <Space>

      </Space>
    </Form>
  </>
}