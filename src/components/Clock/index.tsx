import React, { useEffect, useState } from 'react';
import moment from 'moment';

const Clock = () => {
  const [now, setNow] = useState(moment().format('YYYY-MM-DD HH:mm:ss'));
  let timeId
  const timer = () => {
    clearInterval(timeId);
    setNow(moment().format('YYYY-MM-DD HH:mm:ss'));
    timeId = setTimeout(
      timer, 1000
    );
  }
  const cleanTimer = () => {
    clearInterval(timeId);
  }
  useEffect(() => {
    timer();
    return cleanTimer;
  }, []);

  return (
    <React.Fragment>
      {now}
    </React.Fragment>
  )
};

export default Clock;
