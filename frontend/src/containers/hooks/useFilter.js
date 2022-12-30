import {
    useState, createContext, useContext
} from "react";

const FilterContext = createContext({
    setSearchTitle: () => { },
    setTimeRange: () => { },
    setLocationTagSelected: () => { },
    setRewardTagsSelected: () => { },
    setTypeTagsSelected: () => { },
    searchTitle: '',
    timeRange: [null, null],
    locationTagsSelected: [],
    rewardTagsSelected: [],
    typeTagsSelected: []
})

const FilterProvider = (props) => {

    // Search Filter //
    const [searchTitle, setSearchTitle] = useState('')
    const [timeRange, setTimeRange] = useState([null, null])
    const [locationTagsSelected, setLocationTagsSelected] = useState([])
    const [rewardTagsSelected, setRewardTagsSelected] = useState([])
    const [typeTagsSelected, setTypeTagsSelected] = useState([])
    // Search Filter //


    return (
        <FilterContext.Provider
            value={{
                setSearchTitle,
                setLocationTagsSelected,
                setTimeRange,
                setRewardTagsSelected,
                setTypeTagsSelected,
                searchTitle,
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