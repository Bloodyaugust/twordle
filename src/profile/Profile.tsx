import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { queryGetProfiles } from '../api/profile';

export default function Profile() {
  const { isLoading, error, data } = useQuery(queryGetProfiles);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>There was an error.</span>;
  }

  return (
    <div>
      <span>These are all the profiles</span>
      <div className="flex flex-col gap-4">
        {data?.map(profile => (
          <div key={profile.profile_id}>
            <span>
              {profile.name}-{profile.code}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
