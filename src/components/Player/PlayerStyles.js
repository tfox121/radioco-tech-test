import styled from 'styled-components';

export const PlaybackControlsStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Metadata = styled.div`
  display: flex;
  padding: 1em;
  img {
    width: 50%;
  }
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  
  div.header {
    color: white;
    margin-top: 0;
    margin-bottom: 1em;
  }
`;

export const Spacer = styled.div`
  flex-grow: 1;
`;
