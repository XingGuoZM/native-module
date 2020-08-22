import { createElement, createRef, useEffect} from 'rax';
import View from 'rax-view';
import Text from 'rax-text';
import RecyclerView from 'rax-recyclerview';
import './index.css';

/**
 * 官网recyclerList例子
 */
let styles = {
  root: {
    width: 750,
    paddingTop: 20
  },
  sticky: {
    position: 'sticky',
    width: 750,
    top: 0,
    backgroundColor: '#cccccc'
  },
  container: {
    padding: 20,
    borderStyle: 'solid',
    borderColor: '#dddddd',
    borderWidth: 1,
    marginLeft: 20,
    height: 1000,
    marginRight: 20,
    marginBottom: 10,
  },
  button: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 3,
  },
  box: {
    width: 64,
    height: 64,
  }
};
export default (props) => {
  function Thumb(props) {
    console.log(props);
    return (
      <RecyclerView.Cell>
        <View style={styles.button}>
          <View style={styles.box} >{props.val}</View>
        </View>
      </RecyclerView.Cell>
    );
  }
  let THUMBS = [];
  for (let i = 0; i < 10000; i++) THUMBS.push(i);
  let createThumbRow = (val, i) => <Thumb key={i} val={i} />;
  return <RecyclerView className="list-wrapper" >
    <RecyclerView.Header style={styles.sticky}>
      <Text>Sticky view is not header</Text>
    </RecyclerView.Header>

    <RecyclerView.Header>
      <View style={styles.sticky}>
        <Text>Sticky view must in header root</Text>
      </View>
    </RecyclerView.Header>

    {THUMBS.map(createThumbRow)}
  </RecyclerView>;
};