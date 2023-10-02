import styled from '@emotion/styled';
import React, { useEffect } from 'react';

const StyledDialog = styled.div<{
  open: boolean;
}>`
  position: fixed;
  top: 24px;
  height: 100%;
  width: 100%;
  background-color: #1c1c1e;
  border-radius: 1rem 1rem 0 0;
  z-index: 100;

  transition: all 0.3s ease-in-out;
  animation: fadeIn 0.3s ease-in-out;
`;

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
};

function Dialog({ open, setOpen, children }: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  if (!open) return null;
  return <StyledDialog open={open}>{children}</StyledDialog>;
}

export default Dialog;
