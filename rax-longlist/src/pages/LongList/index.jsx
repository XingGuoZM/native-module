import {createElement,createRef, useEffect, useState} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Image from 'rax-image';
import ScrollView from 'rax-scrollview'
import mock from './mock'
import './index.css'

const scrollRef = createRef();
const lastRef = createRef();
export default ()=>{
  const [list,setList]=useState(mock.list(0))
  let page=0
  useEffect(()=>{
    scrollRef.current._nativeNode.addEventListener('scroll',()=>{
      let y=lastRef.current.getBoundingClientRect().bottom
      // 最底部item的底部到屏幕最上方的距离比上屏幕的距离，我们已知底部导航的高度占屏幕高度的10%
      const distance=y/document.documentElement.clientHeight
      // 计算比率，检测是否到底了
      if(distance<0.91 ){
        page++
        list.push(...mock.list(page))
        setList([...list])
      }
    })
  },[])


  return <View className='wrapper'>
    <View className='message'>
      <Text className='message-text'>微信</Text>
      <Image className='more' source={{uri:'../../public/images/more.jpg'}}/>
    </View>
    <ScrollView className='list-wrapper'  ref={scrollRef}>
        {/* 搜索框 */}
        <View className='search-wrapper' >
          <View className='search' >
            <Image className='search-img' source={{uri:'../../public/images/search.png'}} />
            <Text className='search-text'>搜索</Text>
          </View>
        </View>
        {/* 消息列表 */}
        {list&&list.map(item=>(
          <View className='list-item' key={item.id} >
            <View className='avatar'>
              <Image className='avatar-img' source={{uri:item.image}}/>
            </View>
            <View className='info'>
              <View className='info-msg'>
                <Text className='info-msg-label'>{item.label}</Text>
                <Text className='info-msg-value'>{item.value}</Text>
              </View>
              <View className='info-time'>
                <Text className='info-time-label'>{item.time}</Text>
              </View>
            </View>
          </View>
        ))}
      <View className='bottom' ref={lastRef}>到底了～</View>
    </ScrollView>

    {/* 底部导航 */}
    <View className='nav-wrapper'>
        {
          mock.nav.map(item=>(
          <View className='nav' key={item.id}>
            <Image className='nav-img' source={{uri:item.image}}></Image>
            <Text className='nav-text' style={{color:item.active?'#56ba6a':'#000000'}}>{item.name}</Text>
          </View>
          ))
        }
    </View>
  </View>
}