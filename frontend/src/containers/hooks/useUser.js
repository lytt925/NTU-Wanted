import {
    useState, createContext, useContext
} from "react";

const UserContext = createContext({
    setLogin: () => { },
    setEmail: () => { },
    setName: () => { },
    setPic: () => { },
    setTypeTagsSelected: () => { },
    login: false,
    email: '',
    name: '',
    pic: '',
    likedList: []
})

const UserProvider = (props) => {

    //  User //
    const [login, setLogin] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [pic, setPic] = useState('');
    const [likedList, setLikedList] = useState([])
    //  User //


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