import React from 'react'
import { hoistStatics } from 'recompact'
import { connect } from 'react-redux'
import Router from 'next/router'

const withAuthRedirect = hoistStatics(ComposedComponent => {
  class WithAuthRedirect extends React.PureComponent {
    componentDidMount() {
      this.handleUnauthenticatedUser(this.props)
    }

    handleUnauthenticatedUser = props => {
      const { auth } = props
      if (auth && !auth.user) {
        Router.push('/login')
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  const mapStateToProps = ({ auth }) => ({ auth })

  return connect(mapStateToProps)(WithAuthRedirect)
})

export default withAuthRedirect
