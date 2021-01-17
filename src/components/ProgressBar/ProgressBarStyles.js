import styled from 'styled-components';

export const ProgressWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: 1em;
`;

export const Bar = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  margin: 0 1em;
  background: rgba(255, 255, 255, 0.3);
  height: 0.49em;
  border-radius: 0.28571429rem;
`;

export const Progress = styled.div`
  color: white;
`;
