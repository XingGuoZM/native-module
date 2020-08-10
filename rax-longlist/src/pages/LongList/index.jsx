import {createElement} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Image from 'rax-image';
import './index.css'
export default ()=>{
  const list=[{
    id:1,
    image:'https://img2.woyaogexing.com/2020/08/10/1ea8ba47f2ab480caf0dee105581be97!400x400.jpeg',
    label:'杭州户外群',
    value:'[999条]金木犀:@kim 爱你！',
    time:'下午 11:39'
  }]
  return <View >
    <View className='message'>
      <Text className='message-text'>微信(1)</Text>
      <Image />
    </View>
    <View className='search'>搜索区</View>
    <View className='list-wrapper'>
      {list.map(item=>(
        <View className='list-item' key={item.id}>
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
    </View>
  </View>
}