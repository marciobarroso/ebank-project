import Image from 'next/image'

import { CenteredContainer } from './components/ui/centered-container'

export default function Home() {
  return (
    <CenteredContainer>
      <div className='flex flex-col items-center gap-6'>
        <Image
          src='/images/full-logo.png'
          alt='ebank'
          width={300}
          height={300}
          priority={true}
        />
        <p className='text-center text-xl italic text-gray-800'>
          Your finances, simplified. Make banking easy with EasyBank.
        </p>
      </div>
    </CenteredContainer>
  )
}
