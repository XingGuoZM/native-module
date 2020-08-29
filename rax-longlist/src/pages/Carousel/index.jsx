import { createElement, createRef, useEffect} from 'rax';
import View from 'rax-view';
import Carousel from '../../components/Carousel';
import './index.css';
import mock from './mock';


export default (props) => {
  useEffect(() => {

  }, []);
  return <View >
    <Carousel data={mock.list} />
  </View>;
};