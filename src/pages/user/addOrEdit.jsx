import { Form, Input, Button, Space, message, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { beforeUpload, encrypt, decrypt } from '@utils'
import { useState, useEffect } from 'react'
import FormItem from '@components/FormItem';
import { DES_KEY, DES_IV } from '@config';
import { HOST_URL } from '@config'
function AddOrEdit(props) {
  const { onCancel, queryUser, tableForm, handleType, editData, updateUser, addUser } = props;
  const [fileList, setFileList] = useState([])
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  const uploadProps = {
    name: 'file',
    action: HOST_URL + '/user/uploadUser',
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
    if (!values.password) {
      values.password = encrypt({ DES_KEY, DES_IV, MSG: values.pwd });
      delete values.pwd;
    }
    const res = handleType === 'add'
      ? await addUser(values)
      : await updateUser({ ...values, id: editData.id });
    if (res.success) {
      message.success(res.msg);
      onCancel()
      queryUser(tableForm.getFieldsValue())
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
        name,
        photo,
        account,
        password
      } = editData
      form.setFieldsValue({
        name,
        photo,
        account,
        pwd: decrypt({ DES_IV, DES_KEY, MSG: password })
      })
      setFileList([{ name: photo, url: photo }])
    }
  }, [])
  const itemData = [
    { name: 'name', label: "用户名", childNode: <Input />, required: true },
    { name: 'account', label: "账号", childNode: <Input disabled={handleType === 'edit'} />, required: true },
    { name: 'pwd', label: "密码", childNode: <Input.Password />, required: true },
    {
      name: 'photo', label: "头像", childNode:
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

export default AddOrEdit;