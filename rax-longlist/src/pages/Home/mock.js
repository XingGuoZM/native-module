
import mock from '../../mock.json';

export const getList = (page) => {
  let res = JSON.parse(JSON.stringify(mock.data[0].list));
  return res.map(item => {
    item.id = (page - 1) * 10 + item.id;
    item.label = '用户' + item.id;
    return item;
  });
};

export const getNav = () => {
  return mock.nav;
};