import UserRegisterForm from "../components/UserRegisterForm";

function RegisterCompany() {
    return (
        <UserRegisterForm endpoint="/api/users/register/company/" method="register" />
    );
}

export default RegisterCompany;