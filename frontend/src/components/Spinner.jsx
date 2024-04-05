import React, { useState, useEffect } from 'react';

const Spinner = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return visible ? (
    <div className='animate-spin w-16 h-16 m-8 rounded-full bg-sky-600'></div>
  ) : null;
};

export default Spinner;
