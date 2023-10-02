import styled from '@emotion/styled';
import InputSearch from '../atoms/InputSearch';
import Image from 'next/image';

const StyledContactHeader = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 16px 12px;
  // background-color: #000000;
  backdrop-filter: blur(10px);

  .title {
    font-size: 1.8rem;
    font-weight: 700;
    color: #ffffff;
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
  z-index: 1;
  background-color: #000000;

  .action-left {
    display: flex;
    align-items: center;
    color: #0a84ff;
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

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ContactHeader({ open, setOpen }: Props) {
  const handleOpenAddContact = () => {
    setOpen(true);
  };

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
          <InputSearch />
        </div>
      </StyledContactHeader>
    </>
  );
}

export default ContactHeader;
