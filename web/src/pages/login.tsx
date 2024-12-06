import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function Login() {
  const [login, setLogin] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/sessions", { login });
      localStorage.setItem("user_id", response.data.id);
      navigate("/board");
    } catch (error) {
      alert("Falha no login, tente novamente", error);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen w-full bg-neutral-900 text-neutral-50 p-4">
      <div className="flex w-[450px] items-center justify-center bg-neutral-950 rounded">
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col gap-6 p-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="login">Login</Label>
              <Input
                id="login"
                type="text"
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button type="submit" disabled={!login}>
                Entrar
              </Button>
            </div>
            <div className="flex flex-col gap-2 w-full justify-center items-center">
              <Link
                to="/register"
                className="text-sm text-violet-500 hover:underline hover:text-violet-600"
              >
                Cadastre-se
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
