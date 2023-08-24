/* eslint-disable react/jsx-key */
import { Input, Card, Label} from '../components/ui';
import { useForm } from "react-hook-form";
import { Link,useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {signup, errors: signupErrors} = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    const user = await signup(data);
    if(user){
    navigate('/profile');
    }
  });
  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
      {signupErrors &&
          signupErrors.map((error) => (
            <p className="text-red-500 text-center">{error}</p>
          ))}
        <h1>Register Page</h1>
        <form onSubmit={onSubmit}>
          <Label htmlFor="username">Username</Label>
          <Input
            placeholder="Enter your fullname"
            {...register("username", { required: true })}
          />
          {errors.name && (
            <span className="text-red-500">Name is required</span>
          )}
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500">Email is required</span>
          )}
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-500">Password is required</span>
          )}
          <button className="button-primary">Register</button>
          <div className="flex justify-between my-4">
            <p>Already have an account?</p>
            <Link to="/login" className="font-bold">
              Login
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
export default RegisterPage;
