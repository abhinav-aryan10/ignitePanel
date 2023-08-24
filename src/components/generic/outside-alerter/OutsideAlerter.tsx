/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Hook that alerts clicks outside of the passed ref
 */

interface IProps {
  children: React.ReactNode;
  setExitPopupRef: () => void;
}

function useOutsideAlerter(ref: any, setExitPopupRef: () => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setExitPopupRef();
        /**
         * TO TEST
         * alert('You clicked outside of me!');
         */
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setExitPopupRef, ref]);
}

/**
 * Component that alerts if you click outside of it
 */
const OutsideAlerter: React.FC<IProps> = ({
  children,
  setExitPopupRef,
}: IProps) => {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setExitPopupRef);
  // eslint-disable-next-line react/destructuring-assignment
  return <div ref={wrapperRef}>{children}</div>;
};

OutsideAlerter.propTypes = {
  children: PropTypes.element.isRequired,
};

export default OutsideAlerter;
