import { AppShell, Burger, Button, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";

function Dashboard() {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();

  const handleLogout = () => {
    // setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header withBorder={false}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        <Header />
      </AppShell.Header>

      <AppShell.Navbar p="md" zIndex={1}>
        <AppShell.Section my="md" grow component={ScrollArea}>
          <Navbar />
        </AppShell.Section>

        <AppShell.Section w={220}>
          <Button
            size="md"
            justify="center"
            fullWidth
            rightSection={<RiLogoutBoxLine size={24} />}
            variant="filled"
            color="blue"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}

export default Dashboard;
