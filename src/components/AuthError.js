import React from 'react';

/**
 * The general error compoenent.
 *
 * @export
 * @param {string} message
 * @return {HTML} 
 */
export function Error({ message }) {
  return (
    <div className="alert alert-danger" role="alert">
      Oops...
      {' '}
      {message}
    </div>
  );
}
