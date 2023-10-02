import styled from '@emotion/styled';
import Image from 'next/image';
import React from 'react';

const StyledInputSearch = styled.div`
  position: relative;
  width: 100%;
  height: 2rem;
  border-radius: 0.5rem;
  background-color: #1c1c1e;
  border: none;
  outline: none;
  padding-left: 1rem;

  .search {
    width: 100%;
    height: 2rem;
    border-radius: 0.5rem;
    background-color: transparent;
    border: none;
    outline: none;
    padding-left: 1rem;
    font-size: 1rem;
    font-weight: 400;
    color: #ffffff;
  }

  .search-icon {
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;

    width: 1.5rem;
    height: 1.5rem;
    padding: 0.25rem;
    border-radius: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

type Props = {};

function InputSearch({}: Props) {
  return (
    <StyledInputSearch>
      <input className='search' placeholder='Search' />
      <div className='search-icon'>
        <Image src='/images/search.svg' alt='search' width={100} height={100} />
      </div>
    </StyledInputSearch>
  );
}

export default InputSearch;
