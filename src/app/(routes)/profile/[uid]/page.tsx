'use client';

import { QueryClientProvider } from '@tanstack/react-query';

import { Profile } from '@/entities/user/ui';
import queryClient from '@/shared/lib/queryClient';
import { Header } from '@/widgets';

export default function Page({ params: { uid } }: { params: { uid: string } }) {
  return (
    <>
      <Header />
      <QueryClientProvider client={queryClient}>
        <Profile uid={uid} />
      </QueryClientProvider>
    </>
  );
}
