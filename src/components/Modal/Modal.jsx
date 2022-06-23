import React from 'react'

const Modal = ({ content, isOpen, onClose }) => {
    window.addEventListener('click', (e) => {
        if (e.target.classList[0] === 'modal-overlay') {
            onClose(false)
        }
    })
  return (
    <div className='modal-overlay'>
        <div className="modal">
            <div className="close" onClick={() => onClose(false)}>
                <i className='bx bx-x'></i>
            </div>
            {content()}
        </div>
    </div>
  )
}

export default Modal