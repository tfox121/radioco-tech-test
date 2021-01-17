import styled from 'styled-components';

export const PlayerStyles = styled.div`
  div.segment {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const Mask = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
  z-index: 1;
  position: absolute;
`;

export const Metadata = styled.div`
  display: flex;
  z-index: 2;

  img {
    width: 50%;
    padding: 1em;
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  width: 100%;

  div.ui.inverted.segment {
    background-color: rgba(0, 0, 0, 0.65);
  }

  div.header {
    color: white;
    margin-top: 0;
    margin-bottom: 1em;
  }
`;

export const Controls = styled.div`
  text-align: center;
`;

export const Spacer = styled.div`
  flex-grow: 1;
`;
