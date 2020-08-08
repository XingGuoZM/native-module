import { createElement } from 'rax';
import View from 'rax-view';
import Text from 'rax-text';

import './index.css';

import Logo from '../../components/Logo';

export default function Home() {
  return (
    <View className="home">
      <Logo />
      <Text className="title">Hello World</Text>
    </View>
  );
}
