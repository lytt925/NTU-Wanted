import ResultList from '../components/HomePage/SearchResultList/ResultsList'
import React, { useState, useEffect } from 'react'
import Pagination from '@mui/material/Pagination';
import { PER_PAGE } from '../utils/constants';

const ResultPage = ({expList, count}) => {

    const [page, setPage] = useState(1);

    const begin = (page-1) * PER_PAGE;
    const end = begin + PER_PAGE;
    const pageList = expList.slice(begin, end);

    const handleChange = (e, p) => {
        setPage(p);
      };

    return (
        <>
            <ResultList pageList={pageList} page={page}/>
            <Pagination count={count} page={page} 
                        color="primary" onChange={handleChange}
                        showFirstButton showLastButton />
        </ >
    )
}



export default ResultPage;