import UserLoginForm from "../components/UserLoginForm";

function Login() {
    return (
        <div>
            <UserLoginForm endpoint="/api/users/token/" />
        </div>
    );
}

export default Login;