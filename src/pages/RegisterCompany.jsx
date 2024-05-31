import CompanyRegisterForm from '../components/CompanyRegisterForm';

function RegisterCompany() {
  return <CompanyRegisterForm endpoint="/api/users/register/company/" />;
}

export default RegisterCompany;
