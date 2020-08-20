import { createElement, createRef, useEffect} from 'rax';
import View from 'rax-view';
import ScrollView from 'rax-scrollview';
import throttle from '../../util/throttle';
import './index.css';

const scrollRef = createRef();
const lastRef = createRef();
export default (props) => {
  const {renderContent, data, loadHeight, loadmore} = props;

  useEffect(() => {
    scrollRef.current._nativeNode.addEventListener('scroll', () => {
      let y = lastRef.current.getBoundingClientRect().bottom;
      // 最底部item的底部到屏幕最上方的距离比上屏幕的距离，我们已知底部导航的高度占屏幕高度的10%
      let distance = y / document.documentElement.clientHeight;
      // 计算比率，检测是否到底了
      if (distance < loadHeight || 0.91 && data.length > 0) {
        let test = throttle(loadmore, 1000);
        test();
        // loadmore();
      }
    });
  }, []);
  return <ScrollView className="list-wrapper" ref={scrollRef}>
    {renderContent()}
    <View className="bottom" ref={lastRef}>到底了～</View>
  </ScrollView>;
};