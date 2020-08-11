import { createElement } from 'rax';
import View from 'rax-view';
import LongList from '../LongList';
import './index.css';
export default function Home() {
  return (
    <View className="home">
      <LongList />
    </View> 
  );
}
