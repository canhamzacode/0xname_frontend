import React from 'react';
import Alert from 'react-bootstrap/Alert';

interface PageContentProps {
    children: React.ReactNode;
}

const PageContent: React.FunctionComponent<PageContentProps> = ({ children }) => {
    return (
        <div className="page-content">
            <div className="page-content-child">{children}</div>

            <Alert className="bottom m-2" variant="info" dismissible>
                <b>Newsletter is Here!</b> Subscribe to our newsletter to get Beast DAO latest
                updates and news{' '}
                <a
                    href="https://beastcoopdao.substack.com/subscribe"
                    target="_blank"
                    rel="noreferrer"
                >
                    <b>👉 SUBSCRIBE </b>
                </a>
            </Alert>
        </div>
    );
};
export default PageContent;
