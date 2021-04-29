import { Button, Space, Form, message } from 'antd';
import FormItem from '@components/FormItem'
import { useState, useEffect } from 'react'
import MDEditor from '@uiw/react-md-editor'
import axios from 'axios'
import { HOST_URL } from '@config'
export default (props) => {
  const { itemData, onCancel, getArticleList, addArticle, handleType, editData, updateArticle } = props
  const [form] = Form.useForm();
  const [markdown, setMarkdown] = useState('')
  const onFinish = async (val) => {
    const res = handleType === 'add'
      ? await addArticle({ content: markdown, ...val })
      : await updateArticle({ content: markdown, ...val, id: editData.id });
    if (res.success) {
      message.success(res.msg)
      getArticleList({})
      onCancel()
    }
  }


  const getMarkdown = async (url) => {
    const res = await axios.get(HOST_URL + url)
    setMarkdown(res.data)
  }

  const onReset = () => {
    onCancel()
  }


  useEffect(() => {
    if (handleType === 'edit') {
      const { title, techClassId, url } = editData
      getMarkdown(url)
      form.setFieldsValue({
        title, techClassId
      })
    }
  }, []);


  const ItemData = itemData
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
      <MDEditor value={markdown} onChange={(val) => setMarkdown(val)} />
      <div className="tc ml20">
        <Space>
          <Button type="primary" htmlType="submit"> 提交 </Button>
          <Button htmlType="button" onClick={onReset}> 取消</Button>
        </Space>
      </div>
    </Form>
  </>
}