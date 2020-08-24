import { createElement, createRef, useEffect, useState} from 'rax';
import View from 'rax-view';
import './index.css';

let num = 0;
export default (props) => {
  const {data} = props;
  const [percent, setPercent] = useState(0);
  let [list, setList] = useState(data);
  useEffect(() => {
    setList(list.push(data[0]));

    window.setInterval(() => {
      let len = list.length;
      let n = num % len / len * 100;
      setPercent(n);
      if (num % len === len - 1) {
        window.setTimeout(() => {
          setPercent(0);
          num += 1;
        }, 800);
      }
      num += 1;
    }, 1000);
  }, []);
  function renderDefaultCell(item, index) {
    return <View key={index} className="marquee-item">{item.name}</View>;
  }
  return <View className="marquee-wrap">
    <View style={{
      transform: `translate3d(0,-${percent}%,0)`,
      transition: `${percent === 0 ? 'none' : 'transform .8s ease'}`
    }}>
      {data.map((item, index) => renderDefaultCell(item, index))}
    </View>
  </View>;
};