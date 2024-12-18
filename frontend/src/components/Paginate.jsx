import React from 'react';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useParams } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false }) => {
  const params = useParams();
  const pageNumber = params.pageNumber || 1;

  return (
    <>
      {pages > 1 && (
        <Pagination>
          {[...Array(pages).keys()].map((x) => (
            <LinkContainer
              key={x + 1}
              to={!isAdmin ? `/page/${x + 1}` : `/admin/productlist/${x + 1}`}
            >
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      )}
    </>
  );
};

export default Paginate;
