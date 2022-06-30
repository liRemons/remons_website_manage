import { Button, Space, Form, message, Select } from 'antd';
import FormItem from '@components/FormItem'
import { useState, useEffect } from 'react'
import Vditor from 'vditor';
import axios from 'axios';
import 'vditor/dist/index.css';
import { HOST_URL } from '@config'
function AddOrEdit(props) {
  const { itemData, onCancel, getArticleList, addArticle, handleType, techArticleDetail: editData, updateArticle, userList } = props
  const [form] = Form.useForm();
  // const [markdown, setMarkdown] = useState('');
  const [vditor, setVditor] = useState(null);
  const onFinish = async (val) => {
    const { users } = val;
    if(users?.length) {
      val.userIds = users.join(',')
    }
    const markdown = vditor.getValue();
    const res = handleType === 'add'
      ? await addArticle({ content: markdown, ...val })
      : await updateArticle({ content: markdown, ...val, id: editData.id });
    if (res.success) {
      message.success(res.msg)
      getArticleList({})
      onCancel()
    }
  }

  const onReset = () => {
    onCancel()
  }


  useEffect(() => {
    if (handleType === 'edit') {
      const { title, techClassId, userIds } = editData
      form.setFieldsValue({
        title, techClassId, users: userIds?.split(',')
      })
    }

    const vditor = new Vditor('markdown', {
      height: 300,
      resize: {
        enable: true
      },
      outline: {
        enable: true
      },
      counter: {
        enable: true
      },
      cache: {
        enable: false,
      },
      upload: {
        url: HOST_URL + '/content/uploadTechMarkdownImg',
        linkToImgUrl: HOST_URL + '/content/uploadTechMarkdownLinkToImg',
        format: (files, responseText) => {
          if (typeof responseText === 'string') {
            return JSON.stringify({
              msg: "",
              code: 0,
              data: {
                errFiles: [],
                succMap: {
                  [files?.[0]?.name]: HOST_URL + JSON.parse(responseText)?.path
                }
              }
            })
          }
        },
        multiple: false,
        fieldName: 'file',
      },
      after: async () => {
        setVditor(vditor);
        if (handleType === 'edit') {
          vditor.setValue(editData.content)
          const res = await axios.get(HOST_URL + editData.url)
          if (res.data) {
            vditor.setValue(res.data)
          }
        }
      },
      blur: (val) => { }
    })
  }, []);


  const ItemData = [...itemData, {
    name: 'users', label: "人员权限", childNode: <Select
      mode='multiple'
      options={props.userList.map(({ name: label, id: value }) => ({ label, value }))}
    />
  },]
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
      <div id='markdown'></div>
      <div className="tc ml20">
        <Space>
          <Button type="primary" htmlType="submit"> 提交 </Button>
          <Button htmlType="button" onClick={onReset}> 取消 </Button>
        </Space>
      </div>
    </Form>
  </>
}

export default AddOrEdit;