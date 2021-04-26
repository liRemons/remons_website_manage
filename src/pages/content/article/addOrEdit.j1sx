import axios from 'axios'
import { useState, useEffect } from 'react'
import MDEditor from '@uiw/react-md-editor'
import { Button, Space, } from 'antd'
import styled from './index.module.less'
function AddOrEdit(props) {
  const [markdown, setMarkdown] = useState('');
  const {addArticle}   = props
  const getMark = async () => {
    const res = await axios.get('/mark/feq/summarize/md/React.md')
    setMarkdown(res.data);
  }
  useEffect(() => {
    getMark()
    // let timer = setInterval(() => {
    //   console.log(markdown);
    //   if (markdown) {
    //     localStorage.markdown = markdown
    //   }
    // }, 10000)
    // return () => {
    //   clearInterval(timer)
    // }
  }, [])


  const changeMarkdown = (val) => {
    setMarkdown(val)
  }

  const onReset = () => {

  }
  const submit = () => {
    addArticle({content:markdown})
  }
  return <>
    <MDEditor value={markdown} onChange={changeMarkdown} />
    <div className="tc" style={{ margin: '20px 0' }}>
      <Space>
        <Button type="primary" onClick={submit}> 提交 </Button>
        <Button htmlType="button" onClick={onReset}> 取消</Button>
      </Space>
    </div>
  </>
}

export default AddOrEdit