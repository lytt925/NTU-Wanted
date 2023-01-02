import {
    useState, createContext, useContext, useEffect
} from "react";

const LOCALSTORAGE_KEY = "save-me";
const savedMe = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY))
// console.log(savedMe)


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
    const [email, setEmail] = useState(((savedMe === null) ? "" : savedMe[0]));
    const [name, setName] = useState(((savedMe === null) ? "" : savedMe[1]));
    const [pic, setPic] = useState(((savedMe === null) ? "" : savedMe[2]));
    const [login, setLogin] = useState(((savedMe === null) ? false : true))
    const [likedList, setLikedList] = useState([])
    //  User //

    useEffect(() => {
        if (login) {
            // console.log(savedMe)
            const newme = [email, name, pic]
            // console.log(newme)
            localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(newme));
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
                likedList
            }}
            {...props}
        />
    )
}

const useUser = () => useContext(UserContext)

export { UserProvider, useUser };