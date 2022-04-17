import { useState, useEffect } from 'react';

const useRtl = () => {
  const [rtl, setRtl] = useState<boolean>(document.dir === 'rtl');

  useEffect(() => {
    document.dir = rtl ? 'rtl' : 'ltr';
  }, [rtl]);

  return [rtl, setRtl] as const;
};

export default useRtl;
