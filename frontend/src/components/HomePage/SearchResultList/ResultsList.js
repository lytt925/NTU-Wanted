import TaskInfo from './TaskInfo';
import { useUser } from '../../../containers/hooks/useUser';

// import { ExpList } from '../../db';


export default function ResultList({ pageList }) { // { expList, setExpList }

    const { likedList } = useUser()

    let likedIDList
    try {
        likedIDList = likedList.map((task) => task._id)
    } catch (e) {
        likedIDList = []
    }

    return (
        <>
            {
                pageList.map((task, key) => (
                    <TaskInfo task={task} key={key} liked={likedIDList.includes(task._id)} />
                ))
            }
        </>
    )
}