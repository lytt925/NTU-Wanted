import {
    useState, useEffect, createContext, useContext
} from "react";

const FilterContext = createContext({
    // FilterList: [],
    // sendSearch: () => { },
    // test: false,
    // setTest: () => { },
    // searchDone: true,
    setSearchDone: () => { },
    setSearchName: () => { },
    setLocation: () => { },
    setTimeRange: () => { },
    setTagSelected: () => { },
    setTypeSelected: () => { },
    searchName: '',
    location: [],
    timeRange: [null, null],
    tagSelected: [],
    typeSelected: []
})

const FilterProvider = (props) => {
    // const [FilterList, setFilterList] = useState([])
    // const [test, setTest] = useState(false)
    // const [searchDone, setSearchDone] = useState(true)

    // Search Filter //
    const [searchName, setSearchName] = useState('')
    const [location, setLocation] = useState([])
    const [timeRange, setTimeRange] = useState([null, null])
    const [tagSelected, setTagSelected] = useState([])
    const [typeSelected, setTypeSelected] = useState([])
    // Search Filter //                  

    // const sendSearch = () => {
    //     console.log(setSearchName, setLocation, setTimeRange, setTagSelected, setTypeSelected)
    // }

    return (
        <FilterContext.Provider
            value={{
                // FilterList,
                // sendSearch,
                // test,
                // setTest,
                // searchDone,
                // setSearchDone,
                setSearchName,
                setLocation,
                setTimeRange,
                setTagSelected,
                setTypeSelected,
                searchName,
                location,
                timeRange,
                tagSelected,
                typeSelected,
            }}
            {...props}
        />
    )
}

const useFilter = () => useContext(FilterContext)

export { FilterProvider, useFilter };