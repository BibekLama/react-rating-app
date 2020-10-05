import React from 'react';
import { Link } from 'react-router-dom';

function PageHeader({ title, addButton=false, addTitle="Add", addLink }) {
    
    return (
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2"> {title} </h1>
            <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group mr-2">
                    {addButton  && <Link to={addLink}
                            className="btn btn-sm btn-outline-secondary">
                                {addTitle}
                    </Link>}
                    <button type="button" className="btn btn-sm btn-outline-secondary">Export</button>
                </div>
            </div>
        </div>
    )
}

export { PageHeader }