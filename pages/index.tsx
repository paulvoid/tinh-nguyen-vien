import type { NextPage } from 'next'
import axios from "axios";



const Home: NextPage = () => {
    const testBtn = () => {
        axios.post('http://localhost:3000/api/login', {
            email: 'thunder00boy@gmail.com',
            password: 'tdsang123'
        }).then((res) => {
            console.log(res.data);
        })
    }
    return (
        <div>
            <button className="button is-primary" onClick={testBtn}>Primary</button>
        </div>
    )
}


export default Home
