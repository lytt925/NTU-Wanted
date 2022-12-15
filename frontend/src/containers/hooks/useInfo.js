import {
    useState, useEffect, createContext, useContext
} from "react";

const InfoContext = createContext({
    infoList: [],
    sendSearch: () => { },
    test: false,
    setTest: () => { },
    searchDone: true,
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

const InfoProvider = (props) => {
    const [infoList, setInfoList] = useState([])
    const [test, setTest] = useState(false)
    const [searchDone, setSearchDone] = useState(true)

    // Search Filter //
    const [searchName, setSearchName] = useState('')
    const [location, setLocation] = useState([])
    const [timeRange, setTimeRange] = useState([null, null])
    const [tagSelected, setTagSelected] = useState([])
    const [typeSelected, setTypeSelected] = useState([])
    // Search Filter //                  

    const sendSearch = () => {
        console.log(setSearchName, setLocation, setTimeRange, setTagSelected, setTypeSelected)
    }

    return (
        <InfoContext.Provider
            value={{
                infoList,
                sendSearch,
                test,
                setTest,
                searchDone,
                setSearchDone,
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

const useInfo = () => useContext(InfoContext)

export { InfoProvider, useInfo };