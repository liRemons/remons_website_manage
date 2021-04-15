import axios from 'axios'
import { useState, useEffect, useLayoutEffect } from 'react'
import { Anchor, message } from 'antd'
import MDEditor from '@uiw/react-md-editor'
import { v1 as uuid } from 'uuid'
import methods from 'methods-r'
import './markdown.less'
import './markdowncolor.less'
import styled from './index.module.less'
const { Link } = Anchor
function Markdown(props) {
  const { markdown, container } = props
  const [anchor, setAnchor] = useState([])
  useLayoutEffect(() => {
    if (markdown&&!anchor.length) {
      setTimeout(() => {
        getAuchor()
        initCodeClassName()
        const { location: { hash } } = props;
        if (hash) {
          const a = document.createElement('a')
          a.href = hash;
          a.click()
        }
      }, 500);
    }
  })

  const initCodeClassName = () => {
    document.querySelectorAll('.wmde-markdown-color pre[class*="language-"]').forEach(item => {
      const onlyId = `copy-${uuid()}`;
      const codeType = item.className.replace('language-', '').trim();
      const dom = document.createElement('span')
      dom.innerText = codeType + ' 复制代码';
      dom.fatherClass = onlyId;
      dom.setAttribute('class', 'copy');
      item.className = ' ' + onlyId;
      item.appendChild(dom)
    })
  }

  const getAuchor = () => {
    const anchorArr = []
    document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((item, index) => {
      const text = item.innerText.replace(/\s+/g, '') + '-No-' + index
      item.className = 'anchor_markdown';
      item.id = text
      anchorArr.push({
        title: item.innerHTML,
        text
      })
    })
    setAnchor(anchorArr)

  }

  const handleClick = (e) => {
    if (e.target.className === 'copy') {
      console.log(e);
      const dom = document.querySelector(`.${e.target.fatherClass} code[class*="language-"]`);
      if (dom) {
        methods.copy(dom)
        message.success('复制成功')
      }
    }
  }
  const changeAnchor = (val) => {


  }
  const Node = (__html) => <div dangerouslySetInnerHTML={{ __html }}></div>
  return <>
    <div onClick={handleClick}>
      <MDEditor.Markdown source={markdown} style={{ width: 'calc(100% - 400px)' }} />
      <div style={{ position: 'fixed', zIndex: '9999', right: 0, top: 0, width: '400px' }}>
        <Anchor getContainer={() => document.querySelector(container)} onChange={changeAnchor}>
          {
            anchor.map(item => <Link href={'#' + item.text} key={item.text} title={Node(item.title)}></Link>)
          }
        </Anchor>
      </div>
    </div>
  </>
}

export default Markdown