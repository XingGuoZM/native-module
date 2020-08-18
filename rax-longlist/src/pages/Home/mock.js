
import mock from '../../mock.json';

export const getList = (page) => {
  if (page < 1) return [];
  let res = mock.data[0].list;
  return res.map(item => {
    item.id = page * item.id;
    return item;
  });
};

export const getNav = () => {
  return mock.nav;
};