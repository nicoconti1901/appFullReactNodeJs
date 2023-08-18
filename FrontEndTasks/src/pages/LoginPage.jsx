/* eslint-disable react/no-unescaped-entities */
import { Card, Input, Label } from "../components/ui";
import { Link,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const { signin } = useAuth();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (data) => {
    await signin(data);
    navigate("/profile");
  });
  return (
    <div className="h-[calc(100vh-64px)] flex items-center justify-center">
      <Card>
        <h1 className="text-4xl font-bold my-2 text-center">Sign In</h1>

        <form onSubmit={onSubmit}>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />

          <button className="button-primary">Sign In</button>
          <div className="flex justify-between my-4">
            <p>Don't have an account?</p>
            <Link to="/register" className="font-bold">
              Register
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
export default LoginPage;
