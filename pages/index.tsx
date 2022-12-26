import type { NextPage } from 'next';
import axios from 'axios';
import { Video } from '../types';

interface IProps {
  videos: Video[];
}

const Home = ({ videos }: IProps) => {
  return <h1 className='text-3xl font-bold underline'>Test</h1>;
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/post`);

  // console.log(data);

  return {
    props: { videos: data },
  };
};

export default Home;
