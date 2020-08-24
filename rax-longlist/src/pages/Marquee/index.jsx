import { createElement, createRef, useEffect} from 'rax';
import View from 'rax-view';
import Marquee from '../../components/Marquee';
import './index.css';
import mock from './mock';


export default (props) => {
  useEffect(() => {

  }, []);
  return <View >
    <Marquee data={mock.list} />
  </View>;
};