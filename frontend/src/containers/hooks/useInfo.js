import {
    useState, useEffect, createContext, useContext
} from "react";

const InfoContext = createContext({
    infoList: [],
    sendSearch: () => { },
    test: false,
    setTest: () => { },
    searchDone: true,
    setSearchDone: () => { }
})

const InfoProvider = (props) => {
    const [infoList, setInfoList] = useState([])
    const [test, setTest] = useState(false)
    const [searchDone, setSearchDone] = useState(true)

    const sendSearch = () => {

    }

    return (
        <InfoContext.Provider
            value={{
                infoList,
                sendSearch,
                test,
                setTest,
                searchDone,
                setSearchDone
            }}
            {...props}
        />
    )
}

const useInfo = () => useContext(InfoContext)

export { InfoProvider, useInfo };