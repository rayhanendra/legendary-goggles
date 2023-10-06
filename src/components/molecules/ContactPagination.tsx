import styled from '@emotion/styled';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';

const StyledPagination = styled.div`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  color: ${(props) => props.theme.palette.text.secondary};
  width: 100%;
  max-width: 425px;
  background-color: ${(props) => props.theme.palette.background.default};
  z-index: 10;

  button {
    background-color: transparent;
  }
`;

type Props = {};

function ContactPagination({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const searchValue = searchParams.get('search') || '';
  const page = Number(searchParams.get('page')) || 1;

  // Note: Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  // Note: If the searchValue is not empty, then set the page to 1
  useEffect(() => {
    if (searchValue) {
      router.push(pathname + '?' + createQueryString('page', String(1)));
    }
  }, [searchValue]);

  return (
    <StyledPagination>
      <button
        onClick={() =>
          router.push(
            pathname + '?' + createQueryString('page', String(page - 1))
          )
        }
        disabled={page === 1}
      >
        <Image
          src={'/images/chevron-left.svg'}
          alt='prev'
          width={24}
          height={24}
        />
      </button>
      {page}
      <button
        onClick={() =>
          router.push(
            pathname + '?' + createQueryString('page', String(page + 1))
          )
        }
      >
        <Image
          src={'/images/chevron-right.svg'}
          alt='prev'
          width={24}
          height={24}
        />
      </button>
    </StyledPagination>
  );
}

export default ContactPagination;
