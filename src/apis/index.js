import axios from 'axios';
export const getAllBooks = async () => {
  const {data} = await axios.get(
    'https://teabook-server.herokuapp.com/api/book/get',
  );
  const result = await data.data;
  return result;
};
