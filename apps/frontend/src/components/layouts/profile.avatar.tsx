'use client';

import { useAppSelector } from '@drivebase/ui/lib/redux/hooks';

function ProfileAvatar() {
  const user = useAppSelector((s) => s.profile.user);

  console.log('user', user);

  return <div>ProfileAvatar</div>;
}

export default ProfileAvatar;
