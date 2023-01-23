// in next.js [] means that the url is going to be dynamic

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import axios from 'axios';

import { BASE_URL } from '../../utils';
import { Video } from '../../types';

interface IProps {
  postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setpost] = useState(postDetails);
  const [playing, setplaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoMuted, setisVideoMuted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // if we have valid video selected
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [post, isVideoMuted]);

  const onVideoClick = () => {
    if (playing) {
      videoRef.current?.pause();
      setplaying(false);
    } else {
      videoRef.current?.play();
      setplaying(true);
    }
  };

  if (!post) return null;
  return (
    <div className='flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap'>
      <div className='relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-black'>
        <div className='absolute top-6 left-6 flex gap-6 z-50'>
          <p className='cursor-pointer'>
            <MdOutlineCancel className='text-white text-[35px]' />
          </p>
        </div>
        <div
          className='relative'
          onClick={() => {
            router.back();
          }}
        >
          <div className='lg:h-[100vh] h-[60vh]'>
            <video
              ref={videoRef}
              src={post.video.asset.url}
              onClick={onVideoClick}
              className='h-full cursor-pointer'
            ></video>
          </div>
          <div className='absolute top-[50%] left-[45%] cursor-pointer'>
            {!playing && (
              <button>
                <BsFillPlayFill
                  className='text-white text-6xl lg:text-8xl'
                  onClick={onVideoClick}
                />
              </button>
            )}
          </div>
        </div>
        <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer'>
          {isVideoMuted ? (
            <button onClick={() => setisVideoMuted(true)}>
              <HiVolumeOff className='text-black text-2xl lg:text-4xl' />
            </button>
          ) : (
            <button onClick={() => setisVideoMuted(false)}>
              <HiVolumeUp className='text-black text-2xl lg:text-4xl' />
            </button>
          )}
        </div>
      </div>

      <div className='relative w-[1000px] md:w-[900px] lg-[700px]'>
        <div className='lg:mt-20 mt-10 '>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href='/'>
              {/* can't put image as a child component of a Link */}
              <>
                <Image
                  width={62}
                  height={62}
                  className='rounded-full'
                  src={post.postedBy.image}
                  alt='profile shoot'
                  layout='responsive'
                />
              </>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);
  return {
    props: { postDetails: data },
  };
};
export default Detail;
