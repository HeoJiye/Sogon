import { useGetProfileQuery } from '../api';

export interface ProfileProps {
  uid: string;
}

function Profile({ uid }: ProfileProps) {
  const { data: profileData, isLoading } = useGetProfileQuery(uid);

  if (isLoading || !profileData) {
    return <div>Loading user profile...</div>;
  }

  return (
    <div>
      <li>userId: {profileData.userId}</li>
      <li>nickname: {profileData.nickname}</li>
      <li>profileImage: {profileData.profileImage}</li>
      <li>bio: {profileData.bio}</li>
      <li>status: {profileData.status}</li>
    </div>
  );
}

export default Profile;
