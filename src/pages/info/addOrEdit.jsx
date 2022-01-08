import { Form, Input, Button, Space, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { beforeUpload } from '@utils'
import { useState, useEffect } from 'react'
import FormItem from '@components/FormItem'
import { HOST_URL } from '@config'
function AddOrEdit(props) {
  const { onCancel, queryMyInfo, tableForm, handleType, editData, updateMyInfo, addMyInfo } = props;
  const [fileList, setFileList] = useState([])
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const uploadProps = {
    name: 'file',
    action: HOST_URL + '/info/uploadMyInfo',
    fileList,
    beforeUpload,
    onChange({ file, fileList }) {
      file.status && setFileList(fileList)
      if (file.status === 'done') {
        form.setFieldsValue({ url: file.response.path })
      } else {
        form.setFieldsValue({ url: '' })
      }
    },
  };

  const onFinish = async (values) => {
    console.log({ values });
    const res = handleType === 'add'
      ? await addMyInfo(values)
      : await updateMyInfo({ ...values, id: editData.id });
    if (res.success) {
      message.success(res.msg);
      onCancel()
      queryMyInfo(tableForm.getFieldsValue())
    }
  };
  const onReset = () => {
    setFileList([])
    form.resetFields();
    onCancel()
  };

  useEffect(() => {
    if (handleType === 'edit') {
      const {
        keyName,
        url,
        val,
        description } = editData
      form.setFieldsValue({
        keyName,
        url,
        val,
        description
      })
      setFileList([{ name: url, url }])
    }
  }, [])
  const itemData = [
    { name: 'keyName', label: "key", childNode: <Input />, required: true },
    { name: 'val', label: "value", childNode: <Input /> },
    { name: 'description', label: "描述", childNode: <Input /> },
    {
      name: 'url', label: "文件", childNode:
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