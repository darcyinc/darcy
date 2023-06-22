import { Container } from './styles';

export default function NavbarProfile() {
  return (
    <Container href="/davipatricio">
      <img
        src="https://via.placeholder.com/40"
        alt="Profile"
        decoding="async"
        loading="lazy"
      />

      <div className="profileInfo">
        <p>Davi Patricio</p>
        <span>@davipatricio</span>
      </div>
    </Container>
  );
}
