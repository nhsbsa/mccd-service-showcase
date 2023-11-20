/* eslint-disable import/no-extraneous-dependencies */

'use client';

import ModalImage from 'react-modal-image';

type ZoomImageProps = {
  className?: string
  alt?: string
  small?: string
  medium?: string
  large?: string
  showZoom?: boolean
  showDownload?: boolean
  hideHint?: boolean
}

function ZoomImage({
  className = '', alt = '', small = '', medium = '', large = '', showZoom = false, showDownload = false, hideHint = false,
}: ZoomImageProps) {
  return (
    <div className={className}>
      <ModalImage className="modal-img" alt={alt} small={small} medium={medium} large={large} hideZoom={!showZoom} hideDownload={!showDownload} />
      {!hideHint && (
        <span className="hint-enlarge">
          <i className="fas fa-magnifying-glass-plus" />
          Click image to enlarge
        </span>
      )}
    </div>
  );
}

export default ZoomImage;
