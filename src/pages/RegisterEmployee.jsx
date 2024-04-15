import UserForm from "../components/UserForm";

function RegisterEmployee() {
    return (
        <UserForm endpoint="/api/users/register/employee/" method="register" />
    );
}

export default RegisterEmployee;