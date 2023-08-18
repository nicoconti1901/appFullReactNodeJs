import { Input, Card, Label} from '../components/ui';
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from 'react-router-dom';

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const res = await axios.post("http://localhost:3000/api/signup", data,{
      withCredentials: true,
    });

    console.log(res);
  });
  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
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
