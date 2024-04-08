import UserForm from "../components/UserForm";

function Login() {
    return (
        <div>
            <UserForm endpoint="/api/users/token/" method="login" />
        </div>
    );
}

export default Login;