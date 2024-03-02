import Home from './Home';
import axios from "axios";

function Logout() {
    axios({
        method: "GET",
        url: '/logout'
    })
    .then((response) => {
        const res = response.data
        console.log(res.message)
    })
    .catch ((err) => {
      console.log(err.response)
    })

    return (
        <Home/>
    )
}

export default Logout;