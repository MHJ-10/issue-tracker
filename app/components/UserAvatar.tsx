import Image from 'next/image';

interface Props {
  name: string;
  imageUrl?: string;
}

const UserAvatar = ({ imageUrl, name }: Props) => {
  return imageUrl ? (
    <Image
      className='inline-block h-8 w-8 rounded-full ring-2 ring-slate-200'
      src={imageUrl}
      width={24}
      height={24}
      quality={75}
      alt={name}
    />
  ) : (
    <div className='flex h-8 w-8 flex-col items-center justify-center rounded-full bg-blue-500 text-white ring-2 ring-slate-200'>
      {name?.split('')[0]}
    </div>
  );
};

export default UserAvatar;
