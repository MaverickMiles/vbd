import styled from "styled-components";
import React from "react";

export interface ButtonProps {
    label: string;
    title?: string;
    onClick: () => void;
}

const ButtonContainer = styled.button`
  color: #aaa;
  background: #000;
  font-size: 16px;
  border: 1px solid #888;
  padding: 10px 15px;
  font-family: Antonio;
  &:hover {
    color: #fff;
    border: 1px solid white;
  }
`;

export const Button = (props: ButtonProps) => {
    const {label, title, onClick} = props;

    return (
        <ButtonContainer onClick={onClick} title={title}>
            {label}
        </ButtonContainer>
    );
}