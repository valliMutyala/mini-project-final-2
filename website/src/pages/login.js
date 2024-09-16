import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate=useNavigate()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/login',formData)
        .then(res=>{console.log(res)
            if(res.data.message==="Login successful"){
                navigate('/') 
            }
        })
        // Add your form submission logic here (e.g., send data to backend)
    };

    return (
        <div style={{height:'80vh',width:'100vw'}}>
        <div style={styles.container}>
            <h2 style={{display:'flex',alignItems:'center',justifyContent:'center',fontWeight:'bold'}}>Login</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputContainer}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={styles.input}
                        placeholder="Enter your email"
                    />
                </div>
                <div style={styles.inputContainer}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={styles.input}
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" style={styles.button}>Login</button>
            </form>
        </div></div>
    );
}

const styles = {
    container: {
        width: '300px',
        margin: '0 auto',
        marginTop: '20px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputContainer: {
        marginBottom: '15px',
    },
    input: {
        width: '100%',
        padding: '10px',
        marginTop: '5px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default Login;
