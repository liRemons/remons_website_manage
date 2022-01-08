import { message } from 'antd';
export default (file, type = 'image', size = 1) => {
  const isLt2M = file.size / 1024 / 1024 < size;
  if (!isLt2M) {
    message.error(`文件大小须小于${size}M`);
    return isLt2M;
  }
  switch (type) {
    case 'image':
      const isJpgOrPng = file.type.includes('image');
      if (!isJpgOrPng) {
        message.error('必须是图片格式!');
        return isJpgOrPng;
      }
    default:
      break;
  }
  return true;
};
