import { createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';

import './index.css';
import TodoList from '../TodoList'

export default function Home() {
  return (
    <View className="home">
      <TodoList />
    </View>
  );
}
