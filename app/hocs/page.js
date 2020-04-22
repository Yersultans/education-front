import { compose } from 'recompact'

import '../styles/index.css'
import '../styles/theme.less'

import { withRouter } from 'next/router'
import withData from './withData'
import withLayout from './withLayout'
import withTheming from './withTheming'
import withAnalytics from './withAnalytics'
import withAuthRedirect from './withAuthRedirect'

const page = compose(
  withData,
  withRouter,
  withLayout,
  withAnalytics,
  withTheming,
  withAuthRedirect
)

export default page
