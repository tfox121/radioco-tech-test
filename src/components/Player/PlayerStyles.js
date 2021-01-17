import styled from 'styled-components';

export const PlayerStyles = styled.div`
  min-height: 483px;

  div.wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 483px;
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
  min-height: 483px;

  div.fresnel-container {
    min-width: 50%;
    max-width: 50%;
  }

  @media only screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Text = styled.div`
  min-height: 483px;
  display: flex;
  flex-direction: column;
  padding: 1em;
  min-width: 50%;

  div.ui.inverted.segment {
    background-color: rgba(0, 0, 0, 0.65);

    div {
      width: 100%;
    }
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
