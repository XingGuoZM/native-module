import { createElement,useState, useEffect } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import TextInput from "rax-textinput";
import './index.css';

export default function TodoList() {
  const [value,setValue]=useState([]);
  const [init,setInit] = useState();
  function handleChange(e){
    value.push(e.value)
    setValue([...value])
    setInit('')
  }
  useEffect(()=>{},[value])
  const todolist=value.map((item,index)=>(<Text key={index} className='todo-item'> • {item}</Text>))
  return (
    <View className="todo-wrapper">
      <TextInput className='todo-input' 
        defaultValue={init}
        autoFocus={true} 
        onChange={(e)=>handleChange(e)}/>
      <View className='todo-list'>{todolist}</View>
    </View>
  );
}
