import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';

const StyledLoader = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;

  .icon {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

type Props = {};

function Loader({}: Props) {
  return (
    <StyledLoader>
      <Image
        src='/images/loader.png'
        alt='loader'
        width={46}
        height={46}
        className='icon'
      />
    </StyledLoader>
  );
}

export default Loader;
