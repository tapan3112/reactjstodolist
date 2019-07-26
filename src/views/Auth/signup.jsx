import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {
  Button, Form, FormGroup, Label, Input
} from 'reactstrap'
import { signup } from './../../actions/auth'
import NotificationAlert from 'react-notification-alert'
import Loading from './../../components/Loading'

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      name: '',
      email: '',
      phone: '',
      password: '',
      password_confirmation: ''
    }

    this.handleSignUp = this.handleSignUp.bind(this)
  }

  handleSignUp = (e) => {
    e.preventDefault()
    this.props.signup({
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation
    })
    this.setState({ loading: true })
  }

  componentWillReceiveProps(props) {
    if ((!props.resStatus && props.resMessage && props.dispatchType === "SIGN_UP")) {
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
      <div className="auth-signup auth-main-block">
        {this.state.loading ? <Loading /> : ''}
        <NotificationAlert ref="notificationAlert" />
        <h2>Sign Up</h2>
        <Form onSubmit={this.handleSignUp}>
          <FormGroup>
            <Label for="exampleEmail">Name</Label>
            <Input type="text" name="name" id="exampleName" placeholder="Enter your name" onChange={(e) => this.setState({ name: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input type="email" name="email" id="exampleEmail" placeholder="Enter your email" onChange={(e) => this.setState({ email: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="exampleEmail">Phone No.</Label>
            <Input type="text" name="phone" id="examplePhone" placeholder="Enter your phone number" onChange={(e) => this.setState({ phone: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input type="password" name="password" id="examplePassword" placeholder="Enter your password" onChange={(e) => this.setState({ password: e.target.value })} />
          </FormGroup>
          <FormGroup>
            <Label for="exampleConfirmPassword">Password</Label>
            <Input type="password" name="confirm-password" id="exampleConfirmPassword" placeholder="Re-type your password" onChange={(e) => this.setState({ password_confirmation: e.target.value })} />
          </FormGroup>
          <div className="d-flex justify-content-between align-items-center">
            <Button>Register</Button>
            <span>Already have an account? <NavLink to="/login"> Login here</NavLink></span>
          </div>
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

export default connect(mapStateToProps, { signup }, null, { pure: false })(SignUp)