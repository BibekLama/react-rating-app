import React, { useEffect, useState } from 'react';
import { Pagination, Form } from 'react-bootstrap';

function MPagination({ currentPage, data, perPage, handlePagination }) {

    const [pages, setPages] = useState([]);

    useEffect(() => {
        handlePageData(currentPage, perPage);
        getPages();
    }, [currentPage, data, perPage]);

    function handlePageData(page, pPage) {
        let off = (page - 1) * pPage;
        let movies = [];
        data.forEach((item, index) => {
            if (index >= off && index < (parseInt(off)+parseInt(pPage))) {
                movies.push(item);
            }
        });
        handlePagination(movies, pPage >= data.length ? 1 : page, pPage, off);
    }

    function getPages() {
        let items = [];
        let rem = data.length % perPage;
        let total = 0;
        if (rem > 0) {
            total = parseInt(data.length / perPage) + 1;
        } else {
            total = data.length / perPage;
        }
        for (let number = 1; number <= total; number++) {
            if (number >= currentPage - 5 && number < currentPage + 5) {
                items.push(
                    <Pagination.Item key={number} active={number === currentPage} onClick={(e) => handlePageData(number, perPage)}>
                        {number}
                    </Pagination.Item>,
                );
            }
        }
        setPages(items);
    }

    function handlePerPage(e){
        e.preventDefault();
        handlePageData(currentPage, e.target.value);
        getPages();
    }

    return (
        <div className="d-flex align-items-baseline py-3">
            <Form.Control
                as="select"
                size="sm"
                className="mr-2 w-auto"
                onChange={(e) => handlePerPage(e)}
                value={perPage}
                variant="outline-secondary">
                <option>Choose...</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={50}>50</option>
            </Form.Control>

            <Pagination size="sm">
                <Pagination.First disabled={currentPage <= 1 ? true : false} onClick={(e) => handlePageData(1, perPage)} />

                <Pagination.Prev disabled={currentPage <= 1 ? true : false} onClick={(e) => handlePageData(currentPage - 1, perPage)} />

                <Pagination.Ellipsis />

                {pages}

                <Pagination.Ellipsis />

                <Pagination.Next disabled={currentPage >= pages.length ? true : false} onClick={(e) => handlePageData(currentPage + 1, handlePerPage)} />

                <Pagination.Last disabled={currentPage >= pages.length ? true : false} onClick={(e) => handlePageData(pages.length, perPage)} />
            </Pagination>
        </div>
    )
}

export { MPagination }