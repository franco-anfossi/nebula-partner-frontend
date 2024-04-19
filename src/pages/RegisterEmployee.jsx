import UserRegisterForm from "../components/UserRegisterForm";

function RegisterEmployee() {
    return (
        <UserRegisterForm endpoint="/api/users/register/employee/" method="register" />
    );
}

export default RegisterEmployee;