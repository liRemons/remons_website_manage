import { Image } from 'antd'

function IMG(props) {
  return <Image {...props} preview={{ mask: "预览" }} />
}

export default IMG