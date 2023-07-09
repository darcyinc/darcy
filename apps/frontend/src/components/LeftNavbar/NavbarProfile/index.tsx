import { Container } from './styles';

export default function NavbarProfile() {
  return (
    <Container href="/davipatricio">
      <img alt="Profile" decoding="async" loading="lazy" src="https://via.placeholder.com/40" />

      <div className="profileInfo">
        <p>Davi Patricio</p>
        <span>@davipatricio</span>
      </div>
    </Container>
  );
}
