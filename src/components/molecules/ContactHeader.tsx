import styled from '@emotion/styled';
import InputSearch from '../atoms/InputSearch';
import Image from 'next/image';
import useContactStore from '@/store/contactStore';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const StyledContactHeader = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 16px 12px;
  backdrop-filter: blur(16px);
  z-index: 8;

  .title {
    font-size: 1.8rem;
    font-weight: 700;
    color: ${(props) => props.theme.palette.text.primary};
  }

  .input {
    margin-top: 12px;
  }
`;

const StyledContactHeaderAction = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  z-index: 10;
  background-color: ${(props) => props.theme.palette.background.default};

  .action-left {
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.palette.primary.main};
    font-size: 0.86rem;
    cursor: not-allowed;
  }

  .action-right {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    cursor: pointer;
  }
`;

type Props = {};

function ContactHeader({}: Props) {
  const { inputValue, handleSearchChange, handleOpenAddContact } =
    useContactHeader();

  return (
    <>
      <StyledContactHeaderAction>
        <div className='action-left'>
          <Image
            src='/images/chevron-left.svg'
            width={30}
            height={30}
            alt='chevron-left'
          />
          Lists
        </div>
        <div className='action-right' onClick={handleOpenAddContact}>
          <Image src='/images/plus.svg' width={24} height={24} alt='plus' />
        </div>
      </StyledContactHeaderAction>
      <StyledContactHeader>
        <div className='title'>Contacts</div>
        <div className='input'>
          <InputSearch value={inputValue} onchange={handleSearchChange} />
        </div>
      </StyledContactHeader>
    </>
  );
}

const useContactHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const setDialogAction = useContactStore((state) => state.setDialogAction);

  const [inputValue, setInputValue] = useState<string>('');
  const [debouncedValue, setDebouncedValue] = useState<string>('');
  const [mounted, setMounted] = useState<boolean>(false);

  const handleSearchParams = useCallback(
    (debouncedValue: string) => {
      let params = new URLSearchParams(window.location.search);
      if (debouncedValue.length > 0) {
        params.set('search', debouncedValue);
      } else {
        params.delete('search');
      }

      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router]
  );

  // Note: Set Mounted
  useEffect(() => {
    if (debouncedValue.length > 0 && !mounted) {
      setMounted(true);
    }
  }, [debouncedValue, mounted]);

  // Note: Debounce Input Value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  // Note: Search Params
  useEffect(() => {
    if (mounted) handleSearchParams(debouncedValue);
  }, [debouncedValue, handleSearchParams, mounted]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleOpenAddContact = () => {
    setDialogAction({
      type: 'add',
      open: true,
    });
  };

  return {
    inputValue,
    handleSearchChange,
    handleOpenAddContact,
  };
};

export default ContactHeader;
