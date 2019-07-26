import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Button, Form, FormGroup, Label, Input
} from 'reactstrap'
import { login } from './../../actions/auth'
import NotificationAlert from 'react-notification-alert';
import Loading from './../../components/Loading'

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      email: '',
      password: ''
    }

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin = (e) => {
    e.preventDefault()
    this.props.login({
      email: this.state.email,
      password: this.state.password
    })
    this.setState({ loading: true })
  }

  componentWillReceiveProps(props) {
    if ((!props.resStatus && props.resMessage && props.dispatchType === "LOGIN")) {
      this.setState({ loading: false })
      let options = {
        place: "tr",
        message: '  ' + props.resMessage,
        type: "danger",
        icon: "fas fa-exclamation-triangle",
        autoDismiss: 4
      };

      if (this.refs.notificationAlert.state.notifyTR.length < 1) {
        this.refs.notificationAlert.notificationAlert(options);
      }
    }
  }

  render() {
    return (
      <div className="auth-login">
        {this.state.loading ? <Loading /> : ''}
        <NotificationAlert ref="notificationAlert" />
        <h2>Login</h2>
        <Form onSubmit={this.handleLogin}>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="Enter your email" value={this.state.email} onChange={(e) => {
              this.setState({ email: e.target.value })
            }
            } />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="Enter your password" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })} />
          </FormGroup>
          <Button type="submit">Login</Button>
        </Form>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return ({
    resMessage: state.auth.resMessage,
    resStatus: state.auth.resStatus,
    dispatchType: state.auth.dispatchType
  })
}

export default connect(mapStateToProps, { login }, null, { pure: false })(Login)
