import {createElement, createRef, useEffect, useState} from 'rax';
import View from 'rax-view';
import ScrollView from 'rax-scrollview';
import './index.css';
/**
 * 虚拟列表例子
 */
const scrollRef = createRef();

const bottomRef = createRef();
const topRef = createRef();

const firstRef = createRef();
const secondRef = createRef();
const thirdRef = createRef();

let prevDis = 2;
let currDis = 0;
export default () => {
  let [page, setPage] = useState(1);
  function handleScroll() {
    scrollRef.current._nativeNode.addEventListener('scroll', (e) => {
      let y = bottomRef.current.getBoundingClientRect().bottom;
      // console.log()
      // 最底部item的底部到屏幕最上方的距离比上屏幕的距离，我们已知底部导航的高度占屏幕高度的10%
      currDis = y / document.documentElement.clientHeight;
      // 计算比率，检测是否到底了
      let down = 0.91;
      let up = 1.09;
      // 向上滑动
      if (currDis < down && currDis < prevDis) {
        console.log('向上滑动');

        bottomRef.current.style.bottom = `-${100 * page}vh`;
        if (page % 3 === 2) firstRef.current.style.top = `${100 * page + 100}vh`;
        else if (page % 3 === 0) secondRef.current.style.top = `${100 * page + 100}vh`;
        else if (page % 3 === 1) thirdRef.current.style.top = `${100 * page + 100}vh`;
        // page++;
        setPage(++page);
      // 向下滑动
      } else if (currDis > up && currDis > prevDis) {
        // page--;
        setPage(--page);
        console.log('向下滑动');

        bottomRef.current.style.bottom = `-${100 * page}vh`;
        if (page % 3 === 2) firstRef.current.style.top = `${100 * page - 100}vh`;
        else if (page % 3 === 0) secondRef.current.style.top = `${100 * page - 100}vh`;
        else if (page % 3 === 1) thirdRef.current.style.top = `${100 * page - 100}vh`;
      }
    });
  }
  useEffect(() => {
    handleScroll();
  }, []);
  return <ScrollView className="list-wrapper" ref={scrollRef}>
    <View className="page-wrap">
      <View className="top" ref={topRef}>到顶了～</View>
      <View className="first page" ref={firstRef} >{page}</View>
      <View className="second page" ref={secondRef} >{page + 1}</View>
      <View className="third page" ref={thirdRef} >{page + 2}</View>
      <View className="bottom" ref={bottomRef}>到底了～</View>
    </View>
    {/* {list.map(item => <View style={{width: '100vw', height: '20vw', border: '1vw #56bd6a solid', textAlign: 'center'}} key={item}>{item}</View>)} */}

  </ScrollView>;
};