import { Form, Input, Button, Space, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { beforeUpload } from '@utils'
import { useState, useEffect } from 'react'
import FormItem from '@components/FormItem'
import { HOST_URL } from '@config'
function AddOrEdit(props) {
  const { addTechClass, onCancel, getTechClassList, tableForm, handleType, editData, updateTechClass } = props;
  const [fileList, setFileList] = useState([])
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const uploadProps = {
    name: 'file',
    action: HOST_URL + '/content/uploadTechClassIcon',
    fileList,
    beforeUpload,
    onChange({ file, fileList }) {
      file.status && setFileList(fileList)
      if (file.status === 'done') {
        form.setFieldsValue({ icon: file.response.path })
      } else {
        form.setFieldsValue({ icon: '' })
      }
    },
  };

  const onFinish = async (values) => {
    const res = handleType === 'add'
      ? await addTechClass(values)
      : await updateTechClass({ ...values, id: editData.id });
    if (res.success) {
      message.success(res.msg);
      onCancel()
      getTechClassList(tableForm.getFieldsValue())
    }
  };
  const onReset = () => {
    setFileList([])
    form.resetFields();
    onCancel()
  };

  useEffect(() => {
    if (handleType === 'edit') {
      const { name, icon } = editData
      form.setFieldsValue({
        name,
        icon
      })
      setFileList([{ name: '图片', url: icon }])
    }
  }, [])
  const itemData = [
    { name: 'name', label: "技术名称", childNode: <Input /> },
    {
      name: 'icon', label: "icon", childNode:
        <Upload  {...uploadProps}>
          {fileList.length < 1 && <Button icon={<UploadOutlined />}></Button>}
        </Upload>,
    },
  ]


  const formProps = {
    name: "basic",
    form,
    onFinish,
    ...layout
  }

  return <>
    <Form {...formProps}>
      <FormItem itemData={itemData}></FormItem>
      <Space>
        <Button type="primary" htmlType="submit"> 提交 </Button>
        <Button htmlType="button" onClick={onReset}> 取消</Button>
      </Space>
    </Form>
  </>
}

export default AddOrEdit