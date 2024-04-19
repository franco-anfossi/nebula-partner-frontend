import UserLoginForm from "../components/UserLoginForm";

function Login() {
    return (
        <div>
            <UserLoginForm endpoint="/api/users/token/" method="login" />
        </div>
    );
}

export default Login;