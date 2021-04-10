export default () => {
  const loading = document.loading;
  if (!loading) {
    const dom = document.createElement("div");
    dom.setAttribute("id", "loading");
    document.body.appendChild(dom);
  }
};
