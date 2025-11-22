import { createPortal } from 'react-dom';
import styled from './Modal.module.css';
import { useEffect } from 'react';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  function onCloseBackdrop(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  useEffect(() => {
    const handleDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleDown);
      document.body.style.overflow = '';
    };
  });

  return createPortal(
    <div
      onClick={onCloseBackdrop}
      className={styled.backdrop}
      role='dialog'
      aria-modal='true'
    >
      <div className={styled.modal}>
        <button
          onClick={onClose}
          className={styled.closeButton}
          aria-label='Close modal'
        >
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}
