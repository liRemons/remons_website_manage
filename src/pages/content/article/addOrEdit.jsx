import axios from 'axios'
import { useState, useEffect } from 'react'
import { Anchor } from 'antd'
import MDEditor from '@uiw/react-md-editor'

const { Link } = Anchor
function AddOrEdit() {
  const [markdown, setMarkdown] = useState('');
  const [anchor, setAnchor] = useState([])
  const anchorArr = []

  useEffect(() => {
    axios.get('/mark/feq/summarize/md/React.md').then(res => {
      setMarkdown(res.data);
      setTimeout(() => {
        document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach(item => {
          item.className = 'anchor_markdown';
          item.id = item.innerText;
          anchorArr.push({
            title: item.outerHTML, text: item.innerText
          })
          setAnchor(anchorArr)
        })
      }, 500);
    })
  }, [])
  const changeAnchor = (val) => {

  }
  const Node = (__html) => <div dangerouslySetInnerHTML={{ __html }}></div>
  return <>
    <MDEditor.Markdown source={markdown} />
    <div style={{position:'fixed',zIndex:'9999',right:0,top:0}}>
      <Anchor getContainer={()=>document.querySelector('.ant-modal-wrap')} onChange={changeAnchor}>
        {
          anchor.map(item => <Link href={'#' + item.text} key={item.text} title={Node(item.title)}></Link>)
        }
      </Anchor>
    </div>
  </>
}

export default AddOrEdit