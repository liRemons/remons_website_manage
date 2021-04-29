import { urldecode } from '@utils'
import { HOST_URL } from '@config'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Anchor, message, Button } from 'antd'
import MDEditor from '@uiw/react-md-editor'
import { v1 as uuid } from 'uuid'
import methods from 'methods-r'
import { ArrowLeftOutlined } from '@ant-design/icons'
import './markdown.less'
import './markdowncolor.less'
import styled from './index.module.less'
const { Link } = Anchor
function Markdown(props) {
  const [anchor, setAnchor] = useState([]);
  const { history, history: { location } } = props;
  const { url, pathname } = urldecode(location.search);
  const [mark, setMark] = useState('')

  const getMark = async () => {
    const res = await axios.get(HOST_URL + url);
    setMark(res.data)
  }

  const initCodeClassName = () => {
    document.querySelectorAll('.wmde-markdown-color pre[class*="language-"]').forEach(item => {
      const onlyId = `copy-${uuid()}`;
      const codeType = item.className.replace('language-', '').trim();
      const dom = document.createElement('span')
      dom.innerText = codeType + ' 复制代码';
      dom.fatherClass = onlyId;
      dom.setAttribute('class', 'copy');
      item.className += ' ' + onlyId;
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
    document.querySelector('.ant-anchor-link-active')?.scrollIntoView({ block: 'center' })

  }

  const Node = (__html) => <div dangerouslySetInnerHTML={{ __html }}></div>

  useEffect(() => {
    if (mark && !anchor.length) {
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
  useEffect(() => {
    getMark()
  }, []);

  const back = () => {
    history.replace(pathname)
  }

  const btnProps = {
    type: 'primary',
    shape: 'round',
    icon: <ArrowLeftOutlined />,
    size: 'small',
    className: styled.back,
    onClick: back
  }
  return <>
    <Button {...btnProps}>返回</Button>
    <div className={styled.container}>
      <div className={['markdown', styled.markdown].join(' ')} onClick={handleClick}>
        <MDEditor.Markdown source={mark} />
      </div>
      <div className={styled.anchor}>
        <Anchor getContainer={() => document.querySelector('.markdown')} onChange={changeAnchor}>
          {
            anchor.map(item => <Link href={'#' + item.text} key={item.text} title={Node(item.title)}></Link>)
          }
        </Anchor>
      </div>
    </div>
  </>
}

export default Markdown