import axios from 'axios'
import { useState, useEffect, useLayoutEffect } from 'react'
import { Anchor } from 'antd'
import MDEditor from '@uiw/react-md-editor'
import './markdown.less'
import './markdowncolor.less'
import styled from './index.module.less'
const { Link } = Anchor
function AddOrEdit(props) {
  const [markdown, setMarkdown] = useState('');
  const [anchor, setAnchor] = useState([])

  useEffect(() => {
    axios.get('/mark/feq/summarize/md/React.md').then(res => {
      setMarkdown(res.data);
    })
  }, [])

  useLayoutEffect(() => {
    if (markdown && !anchor.length) {
      const { location: { hash } } = props;
      if (hash) {
        
        setTimeout(() => {
          const idDiv = document.querySelector(decodeURI(hash))
          console.log(idDiv.offsetTop);
          document.querySelector('.ant-modal-wrap').scrollTo(0, idDiv.offsetTop)
        }, 1000);
      }
      getAuchor()
    }
  })

  const getAuchor = () => {
    const anchorArr = []
    document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((item, index) => {
      const text = item.innerText.replace(/\s+/g, '') + '-No-' + index
      item.className = 'anchor_markdown';
      item.id = text
      anchorArr.push({
        title: item.outerHTML, text
      })
      setAnchor(anchorArr)
    })

  }
  const changeAnchor = (val) => {


  }
  const changeMarkdown = () => {}
  const Node = (__html) => <div dangerouslySetInnerHTML={{ __html }}></div>
  return <>
  <MDEditor value={markdown} onChange={changeMarkdown}/>
    {/* <MDEditor.Markdown source={markdown} />
    <div style={{ position: 'fixed', zIndex: '9999', right: 0, top: 0 }}>
      <Anchor getContainer={() => document.querySelector('.ant-modal-wrap')} onChange={changeAnchor}>
        {
          anchor.map(item => <Link href={'#' + item.text} key={item.text} title={Node(item.title)}></Link>)
        }
      </Anchor>
    </div> */}
  </>
}

export default AddOrEdit