import { createElement, createRef, useEffect, useState} from 'rax';
import View from 'rax-view';
import Slider from 'rax-slider';
import Recyclerview from 'rax-recyclerview';
import Image from 'rax-image';
import './index.css';


export default (props) => {
  const {data} = props;
  const [index, setIndex] = useState(0);
  const sliderRef = createRef();
  useEffect(() => {

  }, []);
  function changeNav(item, index) {
    sliderRef.current.slideTo(index);
    setIndex(index);
  }
  function changeTab(e) {
    console.log(e.index, data.length);
    if (e.index >= data.length + 2) return;
    setIndex(e.index);
  }
  return <View className="tablist-wrap">
    {/* tab 导航 */}
    <View className="tablist-nav-wrap">
      {data.map((item, i) => <View
        className="tablist-nav"
        style={{color: i === index ? '#ff4747' : '#000'}}
        key={item.name}
        onClick={() => changeNav(item, i)}>
        {item.name}
      </View>)}
    </View>
    {/* tab 列表 */}
    <Slider width="750" height="350" className="carousel-wrap"
      onChange={(e) => changeTab(e)}
      showsPagination={false}
      loop={false}
      ref={sliderRef}>
      {data.map(item => <Slider.Item key={item.name} >
        <Recyclerview style={{width: '100%', height: '100%', backgroundColor: '#f2f2f2'}}>
          {item.list.map(ele => <View key={ele.name}>{ele.name}</View>)}
        </Recyclerview>
      </Slider.Item>)}
    </Slider>
  </View>;
};