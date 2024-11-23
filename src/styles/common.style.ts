import styled from "styled-components";

export const OpacityModulator = styled.div<{opacity: number}>`
  opacity: ${({opacity}) => opacity};
`;
