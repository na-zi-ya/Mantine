import { useState } from "react";
import { Box, NavLink } from "@mantine/core";
import { CgProfile } from "react-icons/cg";
import { MdDomainAdd } from "react-icons/md"
import { MdSettingsBrightness } from "react-icons/md";
import { FaThList } from "react-icons/fa";
import { Link } from "react-router-dom";


const data = [
  { icon: CgProfile, label: "Profile", to: "/profile" },
  { icon: MdDomainAdd, label: "Add Company", to: "/add-company" },
  { icon: MdSettingsBrightness, label: "Manage Company", to: "/manage-company" },
  { icon: FaThList, label: "List Of Companies", to: "/company-list" },
];

function Navbar() {
  const [active, setActive] = useState(0);

  const items = data.map((item, index) => (
    <NavLink
    component={Link}
    to={item.to}
    key={item.label}
    active={index === active}
    label={item.label}
    leftSection={<item.icon size="1rem" style={{ fontSize: '1.5rem', marginRight: 8 }} />}
    onClick={() => setActive(index)}
    style={{
      fontWeight: 600,
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
    }}
  />
  ));

  return <Box w={220}>{items}</Box>;
}
export default Navbar