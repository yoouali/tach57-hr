function Login(){
    return(
        <div>
            <h1>Login Page</h1>
            <form>
                <input name="email" id="email" type="email" placeholder="email"/>
                <input name="password" id="password" type="password" placeholder="password"/>
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login