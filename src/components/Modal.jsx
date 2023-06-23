import { useEffect } from 'react';

function Modal({ onClose, image }) {
  useEffect(() => {
    window.addEventListener('keydown', keyDown);

    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, []);

  function keyDown(e) {
    if (e.code === 'Escape') {
      onClose();
    }
  }

  function overlayClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return (
    <div className="Overlay" onClick={overlayClick}>
      <div className="Modal">
        <img src={image.largeImageURL} alt={image.tags} />
      </div>
    </div>
  );
}

export default Modal;
