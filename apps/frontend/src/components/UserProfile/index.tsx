import UserProfileHeader from './UserProfileHeader';

export default function UserProfile() {
  return (
    <section className="max-w-[600px] pb-12 sm:border-r sm:border-grayBorder sm:p-0">
      <UserProfileHeader
        avatar="https://via.placeholder.com/150"
        banner="https://via.placeholder.com/150"
        bio="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
        handle="davipatricio"
        posts={10}
        username="Davi Patricio"
      />
    </section>
  );
}
