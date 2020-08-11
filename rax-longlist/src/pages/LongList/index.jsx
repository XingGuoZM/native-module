import {createElement} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import Image from 'rax-image';
import ScrollView from 'rax-scrollview'
import mock from './mock'
import './index.css'
export default ()=>{

  return <View className='wrapper'>
    <View className='message'>
      <Text className='message-text'>微信</Text>
      <Image className='more' source={{uri:'../../public/images/more.jpg'}}/>
    </View>
    <ScrollView className='list-wrapper'>
        {/* 搜索框 */}
        <View className='search-wrapper'>
          <View className='search'>
            <Image className='search-img' source={{uri:'../../public/images/search.png'}} />
            <Text className='search-text'>搜索</Text>
          </View>
        </View>
        {/* 消息列表 */}
          {mock.list.map(item=>(
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