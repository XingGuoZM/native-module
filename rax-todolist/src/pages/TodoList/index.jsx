import { createElement,createRef,useState, useEffect } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import TextInput from "rax-textinput";

export default function TodoList() {
  const [value,setValue]=useState([]);
  const inputRef = createRef();
  // 添加项
  function handleChange(e){
    value.push(e.value)
    setValue([...value])
    inputRef.current.clear();
  }
  // 点击画删除线
  function handleClick(e){
    e.target.style.textDecoration='line-through'
  }
  //value变化更新dom
  useEffect(()=>{},[value])
  // list项
  const todolist=value.map((item,index)=>(<Text 
    key={index} 
    style={{height:'40rpx'}} 
    onClick={(e)=>handleClick(e)}> • {item}</Text>))
  return (
    <View>
      <TextInput 
        style={{border:'solid 1px #ccc'}}
        ref={inputRef}
        placeholder='请输入...'
        onChange={(e)=>handleChange(e)}/>
      <View className='todo-list'>{todolist}</View>
    </View>
  );
}
