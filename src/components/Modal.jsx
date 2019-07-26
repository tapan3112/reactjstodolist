import React from 'react';
import { connect } from 'react-redux'
import NotificationAlert from 'react-notification-alert';
import Loading from './Loading'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { addTodo, editTodo } from './../actions/todo'
import { store } from './../index'

class TodoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      todoText: '',
      loading: false
    };

    this.toggle = this.toggle.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleEditTodo = this.handleEditTodo.bind(this);
  }

  toggle() {
    if (this.props.isOpen) {
      this.props.closeModal()
    } else {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }
  }

  handleAddTodo() {
    let token = this.props.token
    this.props.addTodo({ token, name: this.state.todoText })
    this.setState({ todoText: '' })
    this.props.closeModal()
  }

  handleEditTodo() {
    let token = this.props.token
    this.props.editTodo({ token, name: this.state.todoText, todoId: this.props.todoId })
    this.setState({ loading: true, todoText: '' })
    this.props.closeModal()
  }

  componentWillReceiveProps(props) {
    if (props.dispatchType === "ADD_TODO" || props.dispatchType === "EDIT_TODO") {
      this.setState({ loading: false })
      let options = {
        place: "tr",
        message: '  ' + props.resMessage,
        type: props.resStatus ? "success" : "danger",
        icon: "fas fa-exclamation-triangle",
        autoDismiss: 4
      };
      if (this.refs.notificationAlert.state.notifyTR.length < 1) {
        this.refs.notificationAlert.notificationAlert(options);
      }
      store.dispatch({ type: 'CLEAR_TODO_PROPS' })
    }
  }

  render() {
    return (
      <div>
        {this.state.loading ? <Loading /> : ''}
        <NotificationAlert ref="notificationAlert" />
        {
          this.props.modalType === "Add" &&
          <Modal isOpen={this.props.isOpen} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Add Todo</ModalHeader>
            <ModalBody>
              <Input type="textarea" name="text" id="exampleText" value={this.state.todoText} onChange={(e) => this.setState({ todoText: e.target.value })} />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.handleAddTodo}>Add</Button>
              <Button color="secondary" onClick={() => {
                this.setState({ todoText: '', modal: false })
                this.props.closeModal()
              }}>Cancel</Button>
            </ModalFooter>
          </Modal>
        }
        {
          this.props.modalType === "Edit" &&
          <Modal isOpen={this.props.isOpen} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}>Edit Todo</ModalHeader>
            <ModalBody>
              <Input type="textarea" name="text" id="exampleText" defaultValue={this.props.todoName} onChange={(e) => this.setState({ todoText: e.target.value })} />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.handleEditTodo()}>Edit</Button>
              <Button color="secondary" onClick={() => {
                this.setState({ todoText: '', modal: false })
                this.props.closeModal()
              }}>Cancel</Button>
            </ModalFooter>
          </Modal>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return ({
    closeModal: props.closeModal,
    token: state.auth.token || localStorage.getItem('todoToken'),
    data: state.todo.data,
    resMessage: state.todo.resMessage,
    resStatus: state.todo.resStatus,
    dispatchType: state.todo.dispatchType
  })
}

export default connect(mapStateToProps, { addTodo, editTodo }, null, { pure: false })(TodoModal)