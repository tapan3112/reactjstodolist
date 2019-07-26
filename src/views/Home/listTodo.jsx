import React from 'react';
import { connect } from 'react-redux'
import { Card, Button, CardText, Row, Col } from 'reactstrap';
import { listTodo, markComplete } from './../../actions/todo'
import TodoModal from './../../components/Modal'
import Loading from './../../components/Loading'

class ListTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isOpen: false,
      todoId: '',
      todoName: ''
    };

    this.handleComplete = this.handleComplete.bind(this)
  }

  componentDidMount() {
    let token = this.props.token
    this.props.listTodo({ token })
    this.setState({ loading: true })
  }

  componentWillReceiveProps(props) {
    if (props.dispatchType === 'LIST_TODO' || props.dispatchType === 'MARK_COMPLETE') {
      this.setState({ loading: false })
    }
  }

  handleComplete(todoId) {
    let token = this.props.token
    this.props.markComplete({ token, todoId })
    this.setState({ loading: true })
  }

  render() {
    let { data } = this.props
    return (
      <div className='home-list-todo'>
        {this.state.loading ? <Loading /> : ''}
        <Row className="home-list-todo-row">
          {
            data && data.length > 0 &&
            data.map(singleData =>
              (
                <Col sm="12" className='home-list-todo-col' key={singleData.id}>
                  <Card body style={{ borderColor: singleData.status ? '#2bf808' : '#E0E0E0' }}>
                    <CardText>{singleData.name}</CardText>
                    {
                      !singleData.status &&
                      <div className="text-center">
                        <Button className="home-list-todo-button" size="sm" onClick={() => { this.setState({ isOpen: true, todoId: singleData.id, todoName: singleData.name }) }}>Edit</Button>
                        <Button className="home-list-todo-button" size="sm" onClick={() => this.handleComplete(singleData.id)}>Complete</Button>
                      </div>
                    }
                  </Card>
                </Col>
              )
            )
          }
        </Row>
        <TodoModal isOpen={this.state.isOpen} todoId={this.state.todoId} todoName={this.state.todoName} modalType="Edit" closeModal={() => {
          this.setState({ isOpen: false, todoId: '', todoName: '' })
        }} />
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return ({
    token: state.auth.token || localStorage.getItem('todoToken'),
    data: state.todo.data,
    resMessage: state.todo.resMessage,
    resStatus: state.todo.resStatus,
    dispatchType: state.todo.dispatchType
  })
}

export default connect(mapStateToProps, { listTodo, markComplete }, null, { pure: false })(ListTodo)