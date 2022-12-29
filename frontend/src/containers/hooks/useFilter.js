import {
    useState, createContext, useContext
} from "react";

const FilterContext = createContext({
    setSearchName: () => { },
    setLocationSelected: () => { },
    setTimeRange: () => { },
    setTagSelected: () => { },
    setTypeSelected: () => { },
    searchName: '',
    timeRange: [null, null],
    locationSelected: [],
    tagSelected: [],
    typeSelected: []
})

const FilterProvider = (props) => {

    // Search Filter //
    const [searchName, setSearchName] = useState('')
    const [locationSelected, setLocationSelected] = useState([])
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
                setSearchName,
                setLocationSelected,
                setTimeRange,
                setTagSelected,
                setTypeSelected,
                searchName,
                locationSelected,
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