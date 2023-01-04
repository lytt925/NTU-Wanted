import {
    useState, createContext, useContext, useEffect
} from "react";

import axios from '../../containers/api'

const LOCALSTORAGE_KEY = "save-me";
var savedMe = null;
try {
    savedMe = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
    if (savedMe[0].includes("@") === false) { savedMe = null }
    // console.log(savedMe)
}
catch (e) { savedMe = null }


const UserContext = createContext({
    setLogin: () => { },
    setEmail: () => { },
    setName: () => { },
    setPic: () => { },
    setLikedList: () => { },
    login: false,
    email: '',
    name: '',
    pic: '',
    likedList: []
})

const UserProvider = (props) => {

    //  User //
    const [email, setEmail] = useState(savedMe ? savedMe[0] : '');
    const [name, setName] = useState(savedMe ? savedMe[1] : "");
    const [pic, setPic] = useState(savedMe ? savedMe[2] : "");
    const [login, setLogin] = useState(savedMe ? true : false)
    const [likedList, setLikedList] = useState([]);
    const [loading, setLoading] = useState(true);
    //  User //

    const getLikedList = async () => {
        setLoading(true)
        const { data: { message, likedList: newLikeList } } = await axios.get('/getLikedList', {
            params: {
                email
            }
        })
        setLikedList(newLikeList);
        setLoading(false);
    }

    useEffect(() => {
        if (login) {
            const newme = [email, name, pic]
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newme));
            getLikedList()
        }
        else {
            setLikedList([]);
        }
    }, [login]);

    return (
        <UserContext.Provider
            value={{
                setLogin,
                setEmail,
                setName,
                setPic,
                setLikedList,
                login,
                email,
                name,
                pic,
                likedList,
                loading
            }}
            {...props}
        />
    )
}

const useUser = () => useContext(UserContext)

export { UserProvider, useUser };