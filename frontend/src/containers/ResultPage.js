import ResultList from '../components/HomePage/SearchResultList/ResultsList'
import React, { useState, useEffect } from 'react'
import Pagination from '@mui/material/Pagination';
import { PER_PAGE } from '../utils/constants';
import { Box } from '@mui/material';
import { Empty } from 'antd';
import CircularProgress from '@mui/material/CircularProgress';

const ResultPage = ({ expList, count, loading }) => {

    const [page, setPage] = useState(1);
    const begin = (page - 1) * PER_PAGE;
    const end = begin + PER_PAGE;
    const pageList = expList.slice(begin, end);


    const handleChange = (e, p) => {
        setPage(p);
    };

    useEffect( ()=>{
        setPage(1);
    }, [expList])

    const BoxCss = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: '350px',
        width: '69.5%',
        maxWidth: '800px',
        '&, .TaskInfo:first-of-type': { marginTop: "10px", borderTopRightRadius: "5px", borderTopLeftRadius: "5px" },
        '&, .TaskInfo:last-of-type': { marginBottom: "20px", borderBottomRightRadius: "5px", borderBottomLeftRadius: "5px" },
    }

    return (
        <Box sx={{ width: "100vw", display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: '1px solid lightgrey', }}>
            <Box sx={BoxCss}>
                {
                    loading ?
                        <CircularProgress sx={{ color: 'rgb(223, 230, 217)' }} /> :
                        pageList.length !== 0 ?
                            <>
                                <ResultList pageList={pageList} page={page} />
                                <Pagination count={count} page={page}
                                    onChange={handleChange}
                                    showFirstButton showLastButton />
                            </>
                            :
                            <Empty description="目前沒有研究" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                }

            </Box>
        </Box>
    )
}



export default ResultPage;