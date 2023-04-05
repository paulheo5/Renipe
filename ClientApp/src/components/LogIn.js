import { useRef, useState, useEffect, useContext } from 'react';
import { login } from "../services/Auth";
import './SignIn.css';
import { Link } from 'react-router-dom';
import { Layout } from './Layout';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userObj = { "username": user, "password": pwd }
        await login(userObj)
            .then(res => {
                console.log(res.data);
                localStorage.setItem("token", res.data);
                setSuccess(true);
                setUser('');
                setPwd('');
            })
            .catch(err => {
                setErrMsg(err.response.data ?? "No response");
                errRef.current.focus();
            });
    }

    return (
        <>
            {success ? (
                <section className='signin-section' style={{ "width": "auto", "marginLeft": "auto", "marginRight": "auto", "backgroundColor": "dodgerblue" }}>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (
                    <section className='signin-section' style={{ "width": "auto", "marginLeft": "auto", "marginRight": "auto", "backgroundColor": "dodgerblue" }}>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h1>Sign In</h1>
                    <form className='signin-form' onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button className='signin-button'>Sign In</button>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                           <Link to='/signin'>Register</Link>
                        </span>
                    </p>
                </section>
            )}
        </>
    )
}

export default Login