import { useState, useEffect } from 'react';

const useTypingEffect = (elements, speed) => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [deleteCount, setDeleteCount] = useState(0);

  useEffect(() => {
    let interval;

    if (index < elements.length) {
      const currentElement = elements[index];

      if (typeof currentElement === 'string') {
        // Typing the string
        if (deleteCount < currentElement.length) {
          interval = setTimeout(() => {
            setText(text + currentElement[deleteCount]);
            setDeleteCount(deleteCount + 1);
          }, speed);
        } else {
          // Move to the next element
          setIndex(index + 1);
          setDeleteCount(0);
        }
      } else if (typeof currentElement === 'number') {
        // Deleting characters
        if (deleteCount < currentElement) {
          interval = setTimeout(() => {
            setText(text.slice(0, -1));
            setDeleteCount(deleteCount + 1);
          }, speed);
        } else {
          // Move to the next element
          setIndex(index + 1);
          setDeleteCount(0);
        }
      }
    }

    return () => clearTimeout(interval);
  }, [text, index, deleteCount, elements, speed]);

  return text;
};

export default useTypingEffect;