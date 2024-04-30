
// import { createCluster } from './db-actions';

// export const poolCluster = await createCluster();
import { createCluster } from './db-actions';

export async function getPoolCluster() {
  return await createCluster();
}