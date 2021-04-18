import { Form, Input, Button, Space, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { beforeUpload } from '@utils'
import { useState, useEffect } from 'react'
function AddOrEdit(props) {
  const { addSinger, onCancel, getSingerList, tableForm, handleType, editData, updateSinger } = props;
  const [fileList, setFileList] = useState([])
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const uploadProps = {
    name: 'file',
    action: '/api/song/uploadSingerPhoto',
    fileList,
    beforeUpload,
    onChange({ file, fileList }) {
      file.status && setFileList(fileList)
      if (file.status === 'done') {
        form.setFieldsValue({ photo: file.response.path })
      } else {
        form.setFieldsValue({ photo: '' })
      }
    },
  };

  const onFinish = async (values) => {
    const res = handleType === 'add' ? await addSinger(values) : await updateSinger({ ...values, id: editData.id });
    if (res.success) {
      message.success(res.msg);
      onCancel()
      getSingerList(tableForm.getFieldsValue())
    }
  };
  const onReset = () => {
    setFileList([])
    form.resetFields();
    onCancel()
  };

  useEffect(() => {
    if (handleType === 'edit') {
      const { name, photo } = editData
      form.setFieldsValue({
        name,
        photo
      })
      setFileList([{ name: '图片', url: photo }])
    }
  }, [])
  const ItemData = [
    { name: 'name', label: "歌手名", childNode: <Input /> },
    {
      name: 'photo', label: "专辑封面", childNode:
        <Upload  {...uploadProps}>
          {fileList.length < 1 && <Button icon={<UploadOutlined />}></Button>}
        </Upload>,
    },
  ]
  return <>
    <Form
      {...layout}
      name="basic"
      initialValues={{ remember: true }}
      form={form}
      onFinish={onFinish}
    >
      {
        ItemData.map((item, index) =>
          <Form.Item key={item.name + index} name={item.name} label={item.label}>
            {item.childNode}
          </Form.Item>
        )
      }
      <Space>
        <Button type="primary" htmlType="submit"> 提交 </Button>
        <Button htmlType="button" onClick={onReset}> 取消</Button>
      </Space>
    </Form>
  </>
}

export default AddOrEdit