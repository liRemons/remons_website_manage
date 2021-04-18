import { message } from "antd";
export default (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("必须是图片格式!");
  }
  const isLt2M = file.size / 1024 / 1024 < 1;
  if (!isLt2M) {
    message.error("图片大小须小于1M!");
  }
  return isJpgOrPng && isLt2M;
};
