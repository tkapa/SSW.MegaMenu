import React from 'react';
import ReactDOM from 'react-dom';

export default function Portal({
  children,
  className = 'root-portal',
  el = 'div',
}) {
  const [container] = React.useState(() => {
    return document.createElement(el);
  });

  React.useEffect(() => {
    container.classList.add(className);
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return ReactDOM.createPortal(children, container);
}
