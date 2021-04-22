export default (url) => {
  let obj = {};
  let arr = url
    .split("?")
    .filter((_) => _)[0]
    .split("&");
  arr.forEach((item) => {
    const str = item.split("=");
    obj[str[0]] = str[1];
  });
  return obj;
};
