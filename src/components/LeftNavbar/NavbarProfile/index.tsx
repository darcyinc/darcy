import { Container } from './styles';

export default function NavbarProfile() {
  return (
    <Container href="/davipatricio">
      <img src="https://via.placeholder.com/48" alt="Profile" />

      <div>
        <p>Davi Patricio</p>
        <span>@davipatricio</span>
      </div>
    </Container>
  );
}
