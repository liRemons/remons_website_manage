import { withRouter } from 'react-router-dom'
const publicComponent = () => {

}
function Layout(props) {
  console.log(props);
  return <>Layout{props.children}</>
}
export default withRouter(Layout)