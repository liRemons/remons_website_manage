import { Button, Space, Form, Upload,message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import FormItem from '@components/FormItem'
import { useState, useEffect } from 'react'
import { HOST_URL } from '@config'
export default (props) => {
  const { itemData, onCancel, getMusicList, addSong, handleType, editData, updateSong } = props
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([])
  const onFinish = async (val) => {
    const res = handleType === 'add' ? await addSong(val) : await updateSong({ ...val, id: editData.id });
    if (res.success) {
      message.success(res.msg)
      getMusicList({})
      onCancel()
    }
  }

  const onReset = () => {
    setFileList([]);
    onCancel()
  }



  const uploadProps = {
    name: 'file',
    fileList,
    action: HOST_URL + '/music/uploadMusicFile',
    onChange({ file, fileList }) {
      file.status && setFileList(fileList)
      if (file.status === 'done') {
        form.setFieldsValue({ url: file.response.path })
      } else {
        form.setFieldsValue({ url: '' })
      }
    },
  };


  useEffect(() => {
    if (handleType === 'edit') {
      const { name, authorId, collectionId } = editData
      form.setFieldsValue({
        authorId, collectionId, name
      })
    }
  }, []);


  const ItemData = handleType === 'add' ? [
    ...itemData,
    {
      name: 'file', label: "歌曲文件", childNode:
        <Upload {...uploadProps} >
          <Button icon={<UploadOutlined />}>上传</Button>
        </Upload>,
    },
  ] : itemData
  const formProps = {
    name: "edit",
    form,
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 14,
    },
    onFinish,
    size: 'small',
    labelAlign: 'right',
  }
  return <>
    <Form {...formProps}>
      <FormItem itemData={ItemData}></FormItem>
      <Space>
        <Button type="primary" htmlType="submit"> 提交 </Button>
        <Button htmlType="button" onClick={onReset}> 取消</Button>
      </Space>
    </Form>
  </>
}