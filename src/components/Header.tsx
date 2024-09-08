import {
  ActionIcon,
  Paper,
  Text,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import cx from "clsx";
import classes from "./Header.module.css";

const Header = () => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });
  return (
    <Paper
      style={{
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 16px",
        zIndex: 1000,
      }}
    >
      <Text fw={700} fz={30}>
        Mantine
      </Text>
      <ActionIcon
        onClick={() =>
          setColorScheme(computedColorScheme === "light" ? "dark" : "light")
        }
        variant="default"
        size="xl"
        aria-label="Toggle color scheme"
      >
        <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
        <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
      </ActionIcon>
    </Paper>
  );
};

export default Header;
