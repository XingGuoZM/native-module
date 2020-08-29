import { createElement, createRef, useEffect, useState} from 'rax';
import View from 'rax-view';
import Slider from 'rax-slider';
import Image from 'rax-image';
import './index.css';

export default (props) => {
  const {data} = props;
  useEffect(() => {

  }, []);
  return <Slider width="750" height="350" className="carousel-wrap" showsPagination={false}>
    {data && data.map(item => <Slider.Item key={item.name} >
      {/* <Image source={{uri: item.imageUrl}} style={{width: '100%', height: '100%'}} /> */}
      <View style={{width: '100%', height: '100%', backgroundColor: item.backgroundColor}}>{item.name}</View>
    </Slider.Item>)}
  </Slider>;
};