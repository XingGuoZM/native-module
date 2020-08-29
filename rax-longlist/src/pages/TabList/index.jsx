import { createElement, createRef, useEffect} from 'rax';
import View from 'rax-view';
import TabList from '../../components/TabList';
import './index.css';
import mock from './mock';


export default (props) => {
  useEffect(() => {

  }, []);
  return <View >
    <TabList data={mock.data} />
  </View>;
};