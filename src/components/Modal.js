import React from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { transparentize } from 'polished';

import { FocusBoundary } from '@components';
import { background, foreground, pink } from '@utils/theme';

const Backdrop = styled.div`
  background: ${(props) => transparentize(0.2, background(props))};
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
`;

const CloseIcon = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  border-radius: 0 1rem;
  color: inherit;
  cursor: pointer;
  display: flex;
  font-size: 0;
  height: 3rem;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 3rem;

  :after {
    content: '×';
    font-size: 2rem;
  }

  :focus,
  :hover {
    background: ${pink};
    color: ${background};
    outline: none;
  }
`;

const Overlay = styled.div`
  background: ${background};
  box-shadow: 0 0 4px ${foreground};
  border-radius: 1rem;
  left: 50%;
  min-width: 240px;
  overflow: hidden;
  padding: 2rem;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1001;

  &:focus {
    outline: none;
  }

  > :last-child {
    margin-bottom: 0;
  }
`;

const ReturnFocusOnUnMount = ({ children }) => {
  const previousFocus = React.useRef(document.activeElement);

  React.useEffect(
    () => () => {
      previousFocus.current.focus();
    },
    [],
  );

  return children;
};

export const Modal = ({ children, close, isOpen }) => {
  React.useEffect(() => {
    const shortcutListener = (event) => {
      if (isOpen && event.key === 'Escape') {
        event.preventDefault();
        close();
      }
    };

    document.addEventListener('keyup', shortcutListener);

    return () => {
      document.removeEventListener('keyup', shortcutListener);
    };
  }, [close, isOpen]);

  if (!isOpen) {
    return null;
  }

  const content = (
    <ReturnFocusOnUnMount>
      <FocusBoundary onExit={close}>
        <Overlay>
          <CloseIcon onClick={close} autoFocus>
            Close modal
          </CloseIcon>
          {children}
        </Overlay>
      </FocusBoundary>
    </ReturnFocusOnUnMount>
  );

  // note: this close button exists to ensure that there's an available
  // tabbable element _after_ the modal in the dom.
  //
  // if this wasn't there, the modal content would be the last tabbable
  // element. if it's the last element, when you tab out of the modal
  // the browser focuses the url bar, and ignores the FocusBoundary's
  // onExit function.
  //
  // we want to trap the focus inside the window, so that we can re-focus
  // the previous element instead.
  const closeButton = (
    <button className="visually-hidden" onClick={close}>
      Close modal
    </button>
  );

  return createPortal(
    <>
      <Backdrop onClick={close} />
      {content}
      {closeButton}
    </>,
    document.getElementById('modals'),
  );
};
