import React, { ReactNode } from 'react';
import { noop } from 'lodash';
import styled from 'styled-components';

import Variant from '~/constants/variant';

interface IProps {
  variant?: Variant;
  children: ReactNode;
  onClick?: (evnet: any) => void;
}

const Main = styled.button<IProps>`
  background-color: ${props => props.theme.color[props.variant || Variant.PRIMARY]} !important;
`;

const Button = ({ children, variant, onClick = noop }: IProps) => (
  <Main onClick={onClick} variant={variant}>
    {children}
  </Main>
);

export default Button;
