import styled from '@emotion/styled';
import React from 'react';
import Dialog from '../atoms/Dialog';
import InputText from '../atoms/InputText';

const StyledDialogContactAdd = styled.div`
  .action {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background-color: #1c1c1e;
    color: #ffffff;
    font-size: 0.86rem;
    font-weight: 400;
    border-radius: 1rem 1rem 0 0;

    .title {
      font-weight: 700;
    }

    .item {
      cursor: pointer;
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    width: 100%;

    .item {
      :not(:last-child) {
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
`;

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function DialogContactAdd({ open, setOpen }: Props) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} setOpen={setOpen}>
      <StyledDialogContactAdd>
        <div className='action'>
          <div className='item' onClick={handleClose}>
            Cancel
          </div>
          <div className='title'>New Contact</div>
          <div className='item'>Done</div>
        </div>
        <div className='form'>
          <div className='item'>
            <InputText placeholder='First name' />
          </div>
          <div className='item'>
            <InputText placeholder='Last name' />
          </div>
        </div>
      </StyledDialogContactAdd>
    </Dialog>
  );
}

export default DialogContactAdd;
