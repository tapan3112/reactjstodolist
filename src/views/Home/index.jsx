import React from 'react';
import TodoModal from './../../components/Modal'
import AddButton from './addButton'
import ListTodo from './listTodo'
import Navbar from './../../components/Navbar'

const Home = () => {
  document.title = 'Home'
  return (
    <div>
      <Navbar />
      <ListTodo />
      <TodoModal />
      <AddButton />
    </div>
  )
}

export default Home;