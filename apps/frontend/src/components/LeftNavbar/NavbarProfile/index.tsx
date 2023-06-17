import { Container } from './styles';

export default function NavbarProfile() {
  return (
    <Container href="/davipatricio">
      <img src="https://via.placeholder.com/40" alt="Profile" />

      <div className="profileInfo">
        <p>Davi Patricio</p>
        <span>@davipatricio</span>
      </div>
    </Container>
  );
}
