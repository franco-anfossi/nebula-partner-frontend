import EmployeeRegisterForm from '../components/EmployeeRegisterForm';
import Header from '../components/Header';

function RegisterEmployee() {
  return (
    <div>
      <Header />
      <EmployeeRegisterForm endpoint="/api/users/register/employee/" />
    </div>
  );
}

export default RegisterEmployee;
