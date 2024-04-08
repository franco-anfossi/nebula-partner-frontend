import UserForm from "../components/UserForm";

function Register() {
    return (
        <UserForm endpoint="/api/users/register/" method="register" />
    );
}

export default Register;