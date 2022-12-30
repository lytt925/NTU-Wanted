import {
    useState, createContext, useContext
} from "react";

const FilterContext = createContext({
    setSearchName: () => { },
    setTimeRange: () => { },
    setLocationTagSelected: () => { },
    setRewardTagsSelected: () => { },
    setTypeTagsSelected: () => { },
    searchName: '',
    timeRange: [null, null],
    locationTagsSelected: [],
    rewardTagsSelected: [],
    typeTagsSelected: []
})

const FilterProvider = (props) => {

    // Search Filter //
    const [searchName, setSearchName] = useState('')
    const [timeRange, setTimeRange] = useState([null, null])
    const [locationTagsSelected, setLocationTagsSelected] = useState([])
    const [rewardTagsSelected, setRewardTagsSelected] = useState([])
    const [typeTagsSelected, setTypeTagsSelected] = useState([])
    // Search Filter //


    return (
        <FilterContext.Provider
            value={{
                setSearchName,
                setLocationTagsSelected,
                setTimeRange,
                setRewardTagsSelected,
                setTypeTagsSelected,
                searchName,
                locationTagsSelected,
                timeRange,
                rewardTagsSelected,
                typeTagsSelected,
            }}
            {...props}
        />
    )
}

const useFilter = () => useContext(FilterContext)

export { FilterProvider, useFilter };