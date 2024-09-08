import React, { useState, useEffect, useCallback } from "react";
import { Button, TextInput, Paper, Center } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useCompanyContext } from "../context";
const CompanyForm: React.FC = () => {
  const { createCompany, updateCompany, fetchCompanyById, selectedCompany } =
    useCompanyContext();
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchCompany = useCallback(async () => {
    if (id) {
      await fetchCompanyById(id);
    }
  }, [id, updateCompany]);

  useEffect(() => {
    fetchCompany();
  }, []);

  useEffect(() => {
    if (selectedCompany && id) {
      setName(selectedCompany.name);
    }
  }, [selectedCompany, id]);

  const handleSubmit = async () => {
    const data: any = { name };

    try {
      if (id) {
        await updateCompany(id, data);
        navigate("/company-list");
      } else {
        await createCompany(data);
        navigate("/company-list");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Center style={{ height: "85vh", background: "#F5F5F5" }} color="blue">
      <Paper shadow="md" p="lg" withBorder w={520}>
        <TextInput
          p="xs"
          label="Company Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button fullWidth mt="md" onClick={handleSubmit}>
          {id ? "Update Company" : "Add Company"}
        </Button>
      </Paper>
    </Center>
  );
};

export default CompanyForm;
