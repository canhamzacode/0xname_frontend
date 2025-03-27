import React from 'react';

const About: React.FunctionComponent = () => (
    <div className="page-content">
        <h1>Welcome to the About Page</h1>
        <a href={`https://0xname.foo/`} target="_blank" rel="noreferrer">
            Learn more about 0xNAME here
        </a>
    </div>
);

export default About;
