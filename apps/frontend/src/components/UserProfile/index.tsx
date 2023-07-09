import { UserProfileWrapper } from './styles';
import UserProfileHeader from './UserProfileHeader';

export default function UserProfile() {
  return (
    <UserProfileWrapper>
      <UserProfileHeader
        avatar="https://via.placeholder.com/150"
        banner="https://via.placeholder.com/150"
        bio="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
        handle="davipatricio"
        posts={10}
        username="Davi Patricio"
      />
    </UserProfileWrapper>
  );
}
