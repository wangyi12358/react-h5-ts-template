import React from 'react';
import css from './index.less';
import { provideStore, useConnect } from 'model';

function Layout() {

  const [state, dispatch] = useConnect();

  return (
    <div className={css.layout}>
      {state.value}
    </div>
  )
}

export default provideStore(Layout);
