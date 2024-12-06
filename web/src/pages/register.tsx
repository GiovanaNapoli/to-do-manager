import { ArrowLeft02Icon } from "@houstonicons/react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function Register() {
  const [login, setLogin] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/users", { login, name });

      navigate("/board");
    } catch (error) {
      alert("Erro no cadastro", error);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen w-full bg-neutral-900 text-neutral-50 p-4">
      <nav className="flex justify-start w-full p-4">
        <button type="button" onClick={() => navigate("/")}>
          <ArrowLeft02Icon color="white" size={24} />
        </button>
      </nav>
      <div className="flex w-[450px] items-center justify-center bg-neutral-950 rounded">
        <form
          onSubmit={handleSubmit}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col gap-6 p-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="login">Login</Label>
              <Input
                id="login"
                type="text"
                onChange={(e) => setLogin(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Button type="submit" disabled={!login && !name}>
                Cadastrar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
