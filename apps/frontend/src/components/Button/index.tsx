import { Container } from './styles';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  $variant: 'blue' | 'white';
  $size: 'small' | 'large';
}

export default function Button(props: ButtonProps) {
  return <Container {...props}>{props.children}</Container>;
}
