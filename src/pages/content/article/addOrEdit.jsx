import axios from 'axios'
import { useState, useEffect } from 'react'
import { Anchor } from 'antd'
import MDEditor from '@uiw/react-md-editor'
import Markdown from '@components/markdown'
import styled from './index.module.less'
function AddOrEdit(props) {
  const [markdown, setMarkdown] = useState('');
  useEffect(() => {
    axios.get('/mark/feq/summarize/md/React.md').then(res => {
      setMarkdown(res.data);
    })
  }, [])




  const changeMarkdown = () => { }
  return <>
    {/* <MDEditor value={markdown} onChange={changeMarkdown}/> */}
    {/* <MDEditor.Markdown source={markdown} /> */}
    <Markdown {...props} container='.ant-modal-wrap' markdown={markdown}></Markdown>
  </>
}

export default AddOrEdit