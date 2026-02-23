export const dynamic = 'force-dynamic';

import { getTournaments } from '@/data/getTournaments';
import AdminClient from './AdminClient';

export default async function AdminPage() {
  const tournaments = await getTournaments();

  return <AdminClient tournaments={tournaments} />;
}
