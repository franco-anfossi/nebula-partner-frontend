import UserForm from "../components/UserForm";

function RegisterCompany() {
    return (
        <UserForm endpoint="/api/users/register/company/" method="register" />
    );
}

export default RegisterCompany;