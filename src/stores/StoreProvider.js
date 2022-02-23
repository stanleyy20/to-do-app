import React, { createContext } from 'react';

import { DatabaseManager } from '../helpers/DatabaseMenager.ts';

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const database = new DatabaseManager('todo-list-database', ['todo', 'done']);

  return <StoreContext.Provider value={{ database }}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
