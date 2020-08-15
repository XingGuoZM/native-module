
import mock from '../../mock.json';

export const getList = (page) => {
  console.log(mock);
  if (page < 1) return [];
  return mock.data[page - 1];
};

export const getNav = () => {
  return mock.nav;
};