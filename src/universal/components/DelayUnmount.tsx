import React, {Component, ReactNode} from 'react'
import DelayUnmountShrinkAndScale from './DelayUnmountShrinkAndScale'

enum TransitionState {
  Entered,
  Exiting,
  Exited
}

interface State {
  exitingChildren: ReactNode
  transitionState: TransitionState
}

interface Props {
  children: ReactNode
  Animator?: Component
  unmountAfter: number
}

class DelayUnmount extends Component<Props, State> {
  exitTimerId: number | undefined
  state = {
    exitingChildren: null,
    transitionState: TransitionState.Entered
  }

  static getDerivedStateFromProps (nextProps: Props, prevState: State): Partial<State> | null {
    const {children} = nextProps
    if (children !== null) {
      return {
        exitingChildren: nextProps.children,
        transitionState: TransitionState.Entered
      }
    } else if (prevState.transitionState < TransitionState.Exiting) {
      return {
        transitionState: TransitionState.Exiting
      }
    }
    return null
  }

  componentDidUpdate (_prevProps, prevState) {
    if (
      prevState.transitionState !== TransitionState.Exiting &&
      this.state.transitionState === TransitionState.Exiting
    ) {
      this.exitTimerId = window.setTimeout(() => {
        this.exitTimerId = undefined
        this.setState({
          transitionState: TransitionState.Exited
        })
      }, this.props.unmountAfter)
    }
  }

  componentWillUnmount () {
    clearTimeout(this.exitTimerId)
  }

  render () {
    const {Animator = DelayUnmountShrinkAndScale, children, unmountAfter} = this.props
    const {exitingChildren, transitionState} = this.state
    if (transitionState === TransitionState.Exited) return null
    const isExiting = transitionState === TransitionState.Exiting
    return (
      <Animator isExiting={isExiting} duration={unmountAfter}>
        {isExiting ? exitingChildren : children}
      </Animator>
    )
  }
}

export default DelayUnmount
