import styled from '@emotion/styled';
import InputSearch from '../atoms/InputSearch';

const StyledContactHeader = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 8px 12px;
  padding-top: 2rem;
  background-color: #000000;
  // background-color: red;

  .title {
    font-size: 1.8rem;
    font-weight: 700;
    color: #ffffff;
  }
`;

type Props = {};

function ContactHeader({}: Props) {
  return (
    <StyledContactHeader>
      <div className='title'>Contacts</div>
      <InputSearch />
    </StyledContactHeader>
  );
}

export default ContactHeader;
