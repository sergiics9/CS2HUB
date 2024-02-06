import { useEffect } from 'react';
import { useSkins } from '../../hooks/skins/use.skins';
import { Card } from '../card/card';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

import ReactPaginate from 'react-paginate';

import './list.scss';
import React from 'react';

export default function List() {
  const { loadSkins, skins } = useSkins();
  const [currentPage, setCurrentPage] = React.useState(0);

  useEffect(() => {
    loadSkins();
  }, [loadSkins]);

  const PER_PAGE = 9;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(skins.length / PER_PAGE);

  const handlePageClick = ({
    selected: selectedPage,
  }: {
    selected: number;
  }) => {
    setCurrentPage(selectedPage);
  };

  return (
    <>
      <Header></Header>
      <ul className="skins-list">
        {skins.slice(offset, offset + PER_PAGE).map((item) => (
          <Card key={item.name} skin={item}></Card>
        ))}
      </ul>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        previousLinkClassName={'pagination__link'}
        nextLinkClassName={'pagination__link'}
        disabledClassName={'pagination__link--disabled'}
        activeClassName={'pagination__link--active'}
      />
      <Footer></Footer>
    </>
  );
}
