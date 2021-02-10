import React from 'react';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      todo: '',
      todos: data.todos,
      doing: data.doing,
      finish: data.finish,
      modal: 'true'
    };
    this.handleChangeNewTodo = this.handleChangeNewTodo.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.takeToDoing = this.takeToDoing.bind(this);
    this.handleAddTodo = this.handleAddTodo.bind(this);
  }
  handleChangeNewTodo(e){
    this.setState({todo: e.target.value})
  }
  addTodo(e){
    e.preventDefault();

    this.setState({
      todos: [{
        id: Math.random().toString(),
        text: this.state.todo
      },...this.state.todos],
      modal: 'true',
      todo: ''
    })
  }
  takeToDoing(id, parentName, nextElement){
    const findElement = this.state.[parentName].find(element => element.id === id);

    this.setState({
      [parentName]: this.state.[parentName].filter(todo => todo.id !== id),
      [nextElement]: [
          findElement, ...this.state.[nextElement]
      ]
    })
  }
  handleAddTodo(){
    this.setState(state => ({
      modal: !state.modal
    }))
  }
  render(){
  
    return (
      <div className="container">
        <div className="modalBox">
          <div className={this.state.modal ? 'hideModal' : 'showModal'}>
            <form className="modalBoxInput">
              <input value={this.state.todo} onChange={this.handleChangeNewTodo}/>
              <button onClick={this.addTodo}>Add todo</button>
            </form>
          </div>
        </div>
        <div className="modalButton">
          <button onClick={this.handleAddTodo} >
            Add new todo
          </button>
        </div>
        <div className="todoBox">     
          <div>
            <h1>Todo</h1>
            <Todos todos={this.state.todos} takeToDoing={this.takeToDoing} parentName='todos' nextElement='doing'/>
          </div>
          <div>
            <h1>Doing</h1>
              <Todos todos={this.state.doing} takeToDoing={this.takeToDoing} parentName='doing' nextElement='finish'/>
            </div>
          <div>
            <h1>Done</h1>
            <Todos todos={this.state.finish} takeToDoing={this.takeToDoing} parentName='finish' nextElement='todos'/>
          </div>
      </div>
    </div>
    )
  }
}


export default App;

const Todos = (props) => {
  return (
    <div>{props.todos.map(todo => 
      <div key={todo.id} className="todoElement">
        <p>{todo.text}</p>
        <button onClick={e => props.takeToDoing(todo.id, props.parentName, props.nextElement)}>Add to {props.nextElement}</button>
      </div>)}
    </div>
  )
}

const data = 
  {
    todos: [
      {
        id: 1,
        text: 'Lorem ipsum dolor sit amet 1'
      },
      {
        id: 2,
        text: 'Lorem ipsum dolor sit amet 2'
      },
      {
        id: 3,
        text: 'Lorem ipsum dolor sit amet 3'
      }
    ],
    doing: [
      {
        id: 4,
        text: 'Lorem ipsum dolor sit amet 4'
      },
      {
        id: 5,
        text: 'Lorem ipsum dolor sit amet 5'
      },
      {
        id: 6,
        text: 'Lorem ipsum dolor sit amet 6'
      }
    ],
    finish: [
      {
        id: 7,
        text: 'Lorem ipsum dolor sit amet 7'
      },
      {
        id: 8,
        text: 'Lorem ipsum dolor sit amet 8'
      },
      {
        id: 9,
        text: 'Lorem ipsum dolor sit amet 9'
      }
    ],
  }