import { HiOutlineX, HiSearch } from 'react-icons/hi';
import { Container } from './styles';
import { redirect } from 'next/navigation';

export default function TrendingSearch() {
  async function handleSearch(e: FormData) {
    'use server';

    const search = (e.get('search') as string)?.trim() ?? '';
    if (search.length === 0 || search.length > 255) return;

    redirect(`/search?q=${encodeURIComponent(search)}`);
  }

  return (
    <Container action={handleSearch}>
      <HiSearch />
      <input
        type="text"
        placeholder="Buscar na Darcy"
        name="search"
        maxLength={255}
        required
      />
      <button className="clear-icon" type="reset">
        <HiOutlineX />
      </button>
    </Container>
  );
}
