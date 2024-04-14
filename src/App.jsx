import { useState  ,useEffect} from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [setshowFinished, setsetshowFinished] = useState(true)

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if (todostring){
   let todos = JSON.parse(localStorage.getItem("todos"))
   setTodos(todos)
    }
  }, [])

  

  const saveTols = (params)=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setsetshowFinished(!setshowFinished)
  }
  

  
  const handleEdit = (e, id)=>{
    let t = todos.filter(i=>i.id ===id)
   setTodo(t[0].todo)
    let newTodos= todos.filter(item=>{
    return item.id!==id;
   });
  setTodos(newTodos)
    saveTols()
  }

  const handleDelete = (e,id)=>{
    if(window.confirm("are sure to delete this task")){
 let newTodos= todos.filter(item=>{
  return item.id!==id;
 });
setTodos(newTodos)
saveTols()
  }
}

  const handleAdd = ()=>{
setTodos([...todos,{id: uuidv4() ,todo, isCompleted:false}])
setTodo("")
console.log(todos)
saveTols()
  }

  const handleChange= (e)=>{
    setTodo(e.target.value)
      }

    const handleCheckbox = (e) => {
     let id= e.target.name ;
     let index = todos.findIndex(item=>{
      return  item.id===id
     })
     let newTodos= [...todos];
     newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveTols()
    }
      
  return (
    <>
      <Navbar />
      <div className="container w-1/2 bg-gray-500 mx-auto my-5 min-h-[80vh] rounded-xl p-5">
        <h1 className=" font-bold text-center "> i task -mange yr todomlist </h1>
        <div className="addTodo flex gap-3 flex-col my-6">
          <h2 className="text-lg  font-bold">add todo</h2>
          <input  onChange={handleChange} value={todo} type="text" className='w-full  rounded-lg p-4'/>
          <button onClick={handleAdd} disabled= {todo.length<=3}  className="bg-black disabled:bg-slate-900 hover:bg-indigo-700 text-sm font-bold p-3 py-1  rounded-md text-white"> add</button>
        </div>
        <input onChange={toggleFinished} type="checkbox" checked={setshowFinished} /> Show Finished
        <h2 className=" text-lg font-bold">your todo </h2>
        <div className="todos">
{todos.length===0 && <div className="mx-5 font-bold">No todo yet to display</div>}

          {todos.map(item=>{
   
        return (setshowFinished || !item.isCompleted) && <div key={item.id} className="todo flex w-1/2 my-4 justify-between">
           <div className="flex gap-5"><input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            <div className="buttons flex h-full">
            <button onClick={(e)=>{handleEdit(e, item.id)}} className="bg-black hover:bg-indigo-700 text-sm font-bold p-3 py-1 mx-0.5 rounded-md text-white"><FaEdit /></button>
            <button onClick={(e)=>{handleDelete(e, item.id)}} className="bg-black hover:bg-indigo-700 text-sm font-bold p-3 py-1 mx-0.5 rounded-md text-white"><MdDelete /></button>
            </div>
          </div>
          </div>
})}
        </div>
      </div>
    </>
  );
}

export default App;
