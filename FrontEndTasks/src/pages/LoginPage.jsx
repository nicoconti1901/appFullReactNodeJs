/* eslint-disable react/no-unescaped-entities */
import { Card, Input, Label } from "../components/ui";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function LoginPage() {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
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
