import { connect } from '@utils'
import actionCreators from '@store/Home/actions'

function Home(props) {
  console.log(props.setTest());
  return <>Home</>
}

export default connect({ attr: "Home", actionCreators })(Home)