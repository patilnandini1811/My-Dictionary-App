import React from 'react';
import styled from 'styled-components';

const StyledAudio = styled.audio`
  width: 50%;
  background-color: #12d819;
  border-radius: 4px;
  margin:2px;
  box-shadow: 0px 4px 6px #c8dfcc;
   
`;

const Audio = ({ audioSrc }) => (
  audioSrc ? (
    <StyledAudio data-testid="audio-element"controls>
      <source src={audioSrc} type="audio/mpeg" />

      Your browser does not support the audio element.
    </StyledAudio>
  ) : null
);

export default Audio;