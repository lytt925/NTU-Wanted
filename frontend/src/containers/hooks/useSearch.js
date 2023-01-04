import { useEffect, useState } from "react"
import axios from '../../containers/api';
import { PER_PAGE } from "../../utils/constants";
import { useFilter } from "./useFilter";

const useSearch = ({ expList, setExpList, setCount }) => {
    const [loading, setLoading] = useState(false)
    const { searchTitle, timeRange, locationTagsSelected, rewardTagsSelected, typeTagsSelected, } = useFilter()

    useEffect(() => {
        if (expList) {
            setLoading(false)
        }
    }, [expList])

    const sendSearch = async () => {
        setLoading(true)
        const { data: { message, contents } } =
            await axios.get('/getExpList', {
                params: {
                    searchTitle,
                    locationTagsSelected,
                    timeRange,
                    rewardTagsSelected,
                    typeTagsSelected,
                },
            })
        if (message === 'success') {
            setExpList(contents)
            setLoading(false)
            //計算分頁數
            const newCount = Math.ceil(contents.length / PER_PAGE);
            setCount(newCount);
        }
    }

    return { sendSearch, loading, setLoading }
}

export default useSearch;