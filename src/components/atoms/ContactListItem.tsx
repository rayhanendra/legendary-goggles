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

  .action {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .item {
      width: 60px;
      height: 100%;
      margin: 0 6px;
      border-radius: 0.5rem;
      font-size: 0.86rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .text {
        font-size: 0.6rem;
        font-weight: 400;
      }
    }

    .edit {
      color: ${(props) => props.theme.palette.text.primary};
      background-color: ${(props) => props.theme.palette.success.main};
      border: 1px solid ${(props) => props.theme.palette.background.default};
    }

    .delete {
      color: ${(props) => props.theme.palette.text.primary};
      background-color: ${(props) => props.theme.palette.error.main};
      border: 1px solid ${(props) => props.theme.palette.background.default};
    }
  }
`;

type Props = {
  contact: {
    first_name: string;
    last_name: string;
    phones: { number: string }[];
  };
  onEdit: () => void;
  onDelete: () => void;
};

function ContactListItem({ contact, onEdit, onDelete }: Props) {
  const [{ x, scale }, api] = useSpring(() => ({
    x: 0,
    scale: 1,
  }));

  const bind = useDrag(
    ({ active, movement: [mx] }) => {
      const tresholdLeft = -60;
      const tresholdRight = 60;

      api.start({
        x: active ? mx : 0,
        scale: active ? 1.1 : 1,
        immediate: (name) => active && name === 'x',
      });

      if (!active) {
        if (mx < tresholdLeft) {
          api.start({
            x: tresholdLeft,
            immediate: true,
          });
        } else if (mx > tresholdRight) {
          api.start({
            x: tresholdRight,
            immediate: true,
          });
        }
      }
    },
    {
      bounds: { right: 80, left: -80 },
    }
  );

  return (
    <StyledContactItem>
      <animated.div className='fg' style={{ x, scale }} {...bind()}>
        <div className='name'>
          {contact.first_name} {contact.last_name}
        </div>
        <div className='phone'>{contact.phones[0]?.number ?? '-'}</div>
      </animated.div>
      <div className='action' onClick={onEdit}>
        <div className='item edit'>
          <span>✏️</span>
          <div className='text'>Edit</div>
        </div>

        <div className='item delete' onClick={onDelete}>
          <span>🗑️</span>
          <div className='text'>Delete</div>
        </div>
      </div>
    </StyledContactItem>
  );
}

export default ContactListItem;
