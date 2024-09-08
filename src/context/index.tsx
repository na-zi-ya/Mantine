import React, { createContext, useState, useEffect, ReactNode } from "react";
import { api } from "../api";

interface Company {
  id: string;
  reference: string;
  name: string;
  ownerName: string;
  type: string;
  companySizeCode: string;
  status?: {
    name: string;
    color: string;
    position: number;
  };
}

interface CompanyContextProps {
  companies: Company[];
  loading: boolean;
  fetchCompanies: () => void;
  fetchCompanyById: (companyId: string) => Promise<void>;
  selectedCompany: Company | null;
  createCompany: (newCompany: Omit<Company, "id">) => Promise<void>;
  updateCompany: (companyId: string, updatedCompany: Company) => Promise<void>; 
  deleteCompany: (companyId: string) => Promise<void>;
}

const CompanyContext = createContext<CompanyContextProps | undefined>(
  undefined
);

export const CompanyProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/company/list");
      setCompanies(response.data.data);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyById = async (companyId: string) => {
    setLoading(true);
    try {
      const { data } = await api.get(`/api/company/${companyId}`);
      setSelectedCompany(data);
    } catch (error) {
      console.error("Error fetching company details:", error);
    } finally {
      setLoading(false);
    }
  };

  const createCompany = async (newCompany: Omit<Company, "id">) => {
    setLoading(true);
    try {
      await api.post("/api/company", newCompany);
      fetchCompanies(); 
    } catch (error) {
      console.error("Error creating company:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateCompany = async (
    companyId: string,
    updatedCompany: Omit<Company, "id">
  ) => {
    setLoading(true);
    try {
      await api.post(`/api/company`, { id: companyId, ...updatedCompany });
      fetchCompanies(); 
    } catch (error) {
      console.error("Error updating company:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteCompany = async (companyId: string) => {
    setLoading(true);
    try {
      await api.delete(`/api/company/${companyId}`);
      fetchCompanies(); 
    } catch (error) {
      console.error("Error deleting company:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CompanyContext.Provider
      value={{
        companies,
        loading,
        fetchCompanies,
        fetchCompanyById,
        selectedCompany,
        createCompany,
        updateCompany,
        deleteCompany,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompanyContext = (): CompanyContextProps => {
  const context = React.useContext(CompanyContext);
  if (context === undefined) {
    throw new Error("useCompanyContext must be used within a CompanyProvider");
  }
  return context;
};
