import React, { useState, useCallback } from 'react';
import { Table, Button, Tooltip, Group, Badge, Modal, Text } from '@mantine/core';
import { useCompanyContext } from '../context';
import { AiOutlineEdit, AiOutlineEye, AiOutlineDelete } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const ManageCompany: React.FC = () => {
  const { companies, loading, fetchCompanyById, selectedCompany, deleteCompany } = useCompanyContext();
  const [modalOpened, setModalOpened] = useState(false);
  const [viewingCompanyId, setViewingCompanyId] = useState<string | null>(null);
  const [deletingCompanyId, setDeletingCompanyId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleViewClick = useCallback(async (companyId: string) => {
    setViewingCompanyId(companyId);
    setModalOpened(true);
    await fetchCompanyById(companyId);
  }, [fetchCompanyById]);

  const handleEditClick = (companyId: string) => {
    navigate(`/add-company/${companyId}`);
  };

  const handleDeleteClick = async (companyId: string) => {
    setDeletingCompanyId(companyId);
    try {
      await deleteCompany(companyId);
    } catch (error) {
      console.error('Error deleting company:', error);
    } finally {
      setDeletingCompanyId(null);
    }
  };

  const rows = companies.map((company) => (
    <Table.Tr key={company.id}>
      <Table.Td>{company.reference}</Table.Td>
      <Table.Td>{company.ownerName}</Table.Td>
      <Table.Td>{company.companySizeCode}</Table.Td>
      <Table.Td>{company.type}</Table.Td>
      <Table.Td>
        {company.status ? (
          <Badge color={company.status.color}>
            {company.status.name} (Position: {company.status.position})
          </Badge>
        ) : (
          <Badge color="gray.4">No Status</Badge>
        )}
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Tooltip label="View" position="top">
            <Button
              variant="subtle"
              color="yellow"
              onClick={() => handleViewClick(company.id)}
            >
              <AiOutlineEye size={18} />
            </Button>
          </Tooltip>
          <Tooltip label="Edit" position="top">
            <Button
              variant="subtle"
              color="blue"
              onClick={() => handleEditClick(company.id)}
            >
              <AiOutlineEdit size={18} />
            </Button>
          </Tooltip>
          <Tooltip label="Delete" position="top">
            <Button
              variant="subtle"
              color="red"
              onClick={() => handleDeleteClick(company.id)}
              loading={deletingCompanyId === company.id}
            >
              <AiOutlineDelete size={18} />
            </Button>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Table stickyHeader stickyHeaderOffset={60} mt="lg">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Reference</Table.Th>
            <Table.Th>Owner Name</Table.Th>
            <Table.Th>Company Size Code</Table.Th>
            <Table.Th>Type</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            <Table.Tr>
              <Table.Td colSpan={6}>Loading...</Table.Td>
            </Table.Tr>
          ) : (
            rows
          )}
        </Table.Tbody>
      </Table>

      {/* Modal for viewing company details */}
      <Modal
        opened={modalOpened}
        onClose={() => {
          setModalOpened(false);
          setViewingCompanyId(null);
        }}
        title="Company Details"
      >
        {selectedCompany && viewingCompanyId === selectedCompany.id && (
          <>
            <Text>
              <strong>Reference:</strong> {selectedCompany.reference}
            </Text>
            <Text>
              <strong>Owner Name:</strong> {selectedCompany.ownerName}
            </Text>
            <Text>
              <strong>Company Size Code:</strong> {selectedCompany.companySizeCode}
            </Text>
            <Text>
              <strong>Type:</strong> {selectedCompany.type}
            </Text>
            <Text>
              <strong>Status:</strong>
              {selectedCompany.status ? (
                <Badge color={selectedCompany.status.color}>
                  {selectedCompany.status.name} (Position: {selectedCompany.status.position})
                </Badge>
              ) : (
                <Badge color="gray.4">No Status</Badge>
              )}
            </Text>
          </>
        )}
      </Modal>
    </>
  );
};

export default ManageCompany;
