import AppBar from '../components/AppBar'
import SearchBar from '../components/SearchBar';
import CheckboxesGroup from '../components/CheckBox'
import CheckTable from '../components/CheckTable'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Table from '../components/DataTable';
import ResultList from '../components/ResultsList'
import { Container } from '@mui/material';

const BoxCss = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '20px',
    // borderBottom: '2px solid lightgrey'
}

const Wrapper = styled(Container)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
})

function App() {
    return (
        <>
            <AppBar />
            <Wrapper className='App'>
                <Box sx={BoxCss} boxShadow={1}>
                    <SearchBar />
                    {/* <CheckboxesGroup /> */}
                    <CheckTable />
                </Box>
                <ResultList />
            </Wrapper >
        </>
    );
}

export default App;
