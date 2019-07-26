import React from 'react';
import { Button } from 'reactstrap';
import TodoModal from './../../components/Modal'

class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      todoText: '',
      isOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  render() {
    return (
      <div>
        <Button color="success" className="home-add-button" onClick={() => { this.setState({ isOpen: !this.state.isOpen }) }}>Add Todo</Button>
        <TodoModal isOpen={this.state.isOpen} modalType="Add" closeModal={() => {
          this.setState({ isOpen: false })
        }} />

      </div>
    )
  }
}

export default AddButton;