import styled from '@emotion/styled';
import { useDrag } from '@use-gesture/react';
import React from 'react';
import { animated, useSpring } from '@react-spring/web';

const StyledContactItem = styled.div`
  position: relative;
  width: 100%;
  height: 64px;
  pointer-events: auto;
  transform-origin: 50% 50% 0px;
  box-sizing: border-box;
  display: grid;
  align-items: center;
  text-align: center;
  -webkit-user-select: none;
  user-select: none;
  // background: ${(props) => props.theme.palette.error.main};
  touch-action: pan-y;

  :not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.palette.gray[900]};
  }

  .fg {
    cursor: -webkit-grab;
    background-color: ${(props) => props.theme.palette.background.default};
    position: absolute;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0rem 1rem;
    touch-action: pan-y;

    :hover {
      background-color: ${(props) => props.theme.palette.gray[800]};
    }

    .name {
      font-size: 0.86rem;
      font-weight: 700;
      color: ${(props) => props.theme.palette.text.primary};
    }

    .phone {
      font-size: 0.86rem;
      color: ${(props) => props.theme.palette.text.secondary};
    }
  }

  .fg:active {
    cursor: -webkit-grabbing;
  }

  .fg > * {
    pointer-events: none;
  }

  .av {
    width: 60px;
    height: 100%;
    justify-self: right;
    font-size: 0.86rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: ${(props) => props.theme.palette.text.primary};
    background-color: ${(props) => props.theme.palette.error.main};

    .delete {
      font-size: 0.6rem;
      font-weight: 400;
    }
  }
`;

type Props = {
  contact: {
    first_name: string;
    last_name: string;
    phones: { number: string }[];
  };
  onDelete: () => void;
  onClick: () => void;
};

function ContactListItem({ contact, onDelete, onClick }: Props) {
  const [{ x, scale }, api] = useSpring(() => ({
    x: 0,
    scale: 1,
  }));

  const bind = useDrag(
    ({ active, movement: [x] }) => {
      api.start({
        x: active ? x : 0,
        scale: active ? 1.1 : 1,
        immediate: (name) => active && name === 'x',
      });

      const treshold = -60;
      if (x < treshold && !active) {
        api.start({
          x: treshold,
          immediate: true,
        });
      }
    },
    {
      bounds: { right: 0 },
    }
  );

  return (
    <StyledContactItem>
      <animated.div
        className='fg'
        style={{ x, scale }}
        onClick={onClick}
        {...bind()}
      >
        <div className='name'>
          {contact.first_name} {contact.last_name}
        </div>
        <div className='phone'>{contact.phones[0]?.number ?? '-'}</div>
      </animated.div>

      <div className='av' onClick={onDelete}>
        <span>🗑️</span>
        <div className='delete'>Delete</div>
      </div>
    </StyledContactItem>
  );
}

export default ContactListItem;
