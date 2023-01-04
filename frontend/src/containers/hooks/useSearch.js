import { useEffect, useState } from "react"
import axios from '../../containers/api';
import { PER_PAGE } from "../../utils/constants";
import { useFilter } from "./useFilter";

const useSearch = ({ expList, setExpList, setCount }) => {
    const [loading, setLoading] = useState(true)
    const { searchTitle, timeRange, locationTagsSelected, rewardTagsSelected, typeTagsSelected, } = useFilter()
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (expList) {
            setLoading(false)
        }
    }, [expList])

    const sendSearch = async () => {
        setPage(1)
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
            //計算分頁數
            const newCount = Math.ceil(contents.length / PER_PAGE);
            setCount(newCount);
            setLoading(false)
        }
    }

    return { sendSearch, loading, setLoading, page, setPage }
}

export default useSearch;