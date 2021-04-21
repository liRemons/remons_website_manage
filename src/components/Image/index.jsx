import { Image } from 'antd'

function IMG(props) {
  return <Image {...props} fallback={require('@assets/svg/img_error.svg').default} preview={{ mask: "预览" }} />
}

export default IMG