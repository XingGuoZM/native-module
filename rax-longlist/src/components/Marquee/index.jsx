import { createElement, useEffect, useState, useRef } from 'rax';
import View from 'rax-view';
import './index.css';

export default ({ data }) => {
  const [percent, setPercent] = useState(0);
  const timerRef = useRef();
  /**
   * 当data没有数据时或者data取不到则展示‘暂无数据’
   * 当只有一条数据时，展示不滚动
   *  当数据大于等于2，数组第一项复制一份至数组最末尾
   * */
  const len = data?.length;
  if (len > 1) {
    data = data.concat(data[0]);
  }

  useEffect(() => {
    loop(0);
    // 组件销毁时，清除定时器
    return () => {
      window.clearTimeout(timerRef.current);
    }
    // 监听数组变化，数组变化重新开始滚动
  }, [len]);
  const loop = (index) => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(
      () => {
        const n = index % len / len * 100;
        setPercent(n);
        // 当滚动到最后一条时，不需要动画，并且要发生瞬间移动至最头部
        if (len - 1 === index) {
          setPercent(0);
          index = 0;
        }
        index += 1;
        loop(index);
      },
      len - 1 === index ? 800 : 3000
    );
  };
  return (
    <View className="marquee-wrap">
      <View
        style={{
          // 跑马灯滚动动画（过渡动画），动画时长可调，.8s和loop函数里的800相对应
          transform: `translate3d(0,-${percent}%,0)`,
          transition: `${percent === 0 ? 'none' : 'transform .8s ease'}`
        }}
      >
        {/* 数据存在且长度大于0才展示跑马灯*/}
        {len > 0
          ? data.map((item, index) => (
            <View key={index} className="marquee-item">
              {item}
            </View>
          )) : '暂无数据'}
      </View>
    </View>
  );
};