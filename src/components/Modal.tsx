import React, { PropsWithChildren, useState, useEffect } from "react";

interface ModalProps {
    title: string;
    id: string;
    isOpen: boolean; // Added isOpen prop
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({ title, id, isOpen, children }) => {
    const [modalVisible, setModalVisible] = useState(isOpen);

    useEffect(() => {
        setModalVisible(isOpen);
    }, [isOpen]);

    const onClose = () => {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove("show");
            modal.style.display = "none";
        }

        const modalBackdrop = document.getElementsByClassName("modal-backdrop")[0];
        if (modalBackdrop) {
            modalBackdrop.remove();
        }
    };


    return (
        <div
            className={`modal modal-blur fade ${modalVisible ? "show" : ""}`}
            id={id}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            style={{ display: modalVisible ? "block" : "none" }}
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn me-auto" onClick={onClose}>
                            Close
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={onClose}
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
