import React, { useState, useEffect, useRef } from 'react';
import { Video } from '../types';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

interface IProps {
  post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setisHover] = useState(false);
  const [playing, setplaying] = useState(false);
  const [isVideoMuted, setisVideoMuted] = useState(false);

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div className=''>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
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
          <div className='flex items-center gap-2'>
            <Link href='/'>
              <div className='flex gap-2 items-center md:text-md font-bold text-primary'>
                <p>
                  {post.postedBy.userName}
                  {''}
                  <GoVerified
                    className='text-blue-400 text-md
   '
                  />
                </p>
                <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>
                  {post.postedBy.userName}
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className='lg:ml-20 flex gap-4 relative'>
        <div
          onMouseEnter={() => {
            setisHover(true);
          }}
          onMouseLeave={() => {
            setisHover(false);
          }}
          className='rounded-3xl'
        >
          <Link href='/'>
            <video
              className='lg:w[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'
              loop
              src={post.video.asset.url}
            ></video>
          </Link>
          {isHover && (
            <div>
              {playing ? (
                <button>
                  <BsFillPauseFill className='text-black text-2xl lg:text-4xl' />
                </button>
              ) : (
                <button>
                  <BsFillPlayFill className='text-black text-2xl lg:text-4xl' />
                </button>
              )}
              {isVideoMuted ? (
                <button>
                  <HiVolumeOff className='text-black text-2xl lg:text-4xl' />
                </button>
              ) : (
                <button>
                  <HiVolumeUp className='text-black text-2xl lg:text-4xl' />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
