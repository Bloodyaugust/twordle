import React, { useContext } from 'react';
import { userContext } from '../user/User';

export default function Profile() {
  const { user } = useContext(userContext);

  if (!user) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <span>{user.profile_id}</span>
    </div>
  );
}
