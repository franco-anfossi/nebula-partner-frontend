import EmployeeRegisterForm from "../components/EmployeeRegisterForm";

function RegisterEmployee() {
    return (
        <EmployeeRegisterForm endpoint="/api/users/register/employee/" method="register" />
    );
}

export default RegisterEmployee;