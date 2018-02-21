import React from 'react';

import Index from '../Index/Index';

const dataBox = (props) => (
  <div>
    <Index type={props.indexes[0]} value={props.values[0]} />
    <Index type={props.indexes[1]} value={props.values[0]} />
  </div>
);

export default dataBox;