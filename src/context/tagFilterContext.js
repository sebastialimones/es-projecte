import React, { createContext, useContext, useState } from 'react';

const TagFilterContext = createContext();

export const TagFilterProvider = ({ children }) => {
  const [tagFilter, setTagFilter] = useState(null);

  return (
    <TagFilterContext.Provider value={{ tagFilter, setTagFilter }}>
      {children}
    </TagFilterContext.Provider>
  );
};

export const useTagFilter = () => useContext(TagFilterContext);
