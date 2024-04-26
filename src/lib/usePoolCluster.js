'use client'
import { useState, useEffect } from 'react';
import { createCluster } from './db-actions';

const usePoolCluster = () => {
  const [poolCluster, setPoolCluster] = useState(null);

  useEffect(async () => {
    const poolCluster = await createCluster()
    setPoolCluster(poolCluster);
    return () => {
      poolCluster.end((err) => {
        if (err) {
          console.error('Error al cerrar la conexión del PoolCluster:', err);
        } else {
          console.log('Conexión del PoolCluster cerrada correctamente.');
        }
      });
    };
  }, []);

  return poolCluster;
};

export default usePoolCluster;