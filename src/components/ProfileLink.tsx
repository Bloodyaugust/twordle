import React from 'react';
import { NavLink } from 'react-router-dom';
import { Database } from '../../lib/database.types';

type Props = {
  profile?: Database['public']['Tables']['profile']['Row'];
};

export default function ProfileLink({ profile }: Props) {
  if (!profile) {
    return <span>Profile not found</span>;
  }

  return (
    <NavLink className="underline" to={`/twordle/profile/${profile.profile_id}`}>
      {profile.name}
    </NavLink>
  );
}
