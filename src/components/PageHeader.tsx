import { IconPlus } from '@tabler/icons-react';
import React from 'react';

interface PageHeaderProps {
    pretitle: string;
    title: string;
    buttonText: string;
    modalName: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ pretitle, title, buttonText, modalName }) => {
    const modalContent = (
        <div>
            <p>Here you can add details.</p>
            {/* Additional form elements can go here */}
        </div>
    );

    return (
        <div className="page-header d-print-none">
            <div>
                <div className="row g-2 align-items-center">
                    <div className="col">
                        <div className="page-pretitle text-start">{pretitle}</div>
                        <h2 className="page-title">{title}</h2>
                    </div>
                    <div className="col-auto ms-auto d-print-none">
                        <div className="btn-list">


                            <button
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target={`#${modalName}`}
                            >
                                <IconPlus size={18} strokeWidth={2} className="me-2" />
                                {buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageHeader;
