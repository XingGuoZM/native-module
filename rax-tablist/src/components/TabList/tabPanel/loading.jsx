import {createElement} from 'rax';
import View from 'rax-view';

export default function Mod(){
  return (
    <View className="loading"
    style={{
      textAlign:'center',
      height:40,
      marginTop:20,
      marginBottom:20,
      color:'#666'
    }}>
      加载中...
    </View>
  )
}