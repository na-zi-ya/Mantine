import { Button, TextInput, Paper, Center } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setAuth }: { setAuth: (value: boolean) => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleLogin = () => {
    if (username === "admin" && password === "password") {
      setAuth(true);
      navigate("/profile");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <Center style={{ height: "100vh", background: "#F5F5F5"  }}>
      <Paper shadow="md" p="lg" withBorder w={400}>
        <TextInput
          label="Username"
          value={username}
          placeholder="admin"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextInput
          label="Password"
          value={password}
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button fullWidth mt="md" onClick={handleLogin}>
          Login
        </Button>
      </Paper>
    </Center>
  );
};

export default LoginPage;
