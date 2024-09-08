import { Card, Grid, Skeleton, Badge, Text } from '@mantine/core';
import { useCompanyContext } from '../context';

const CompanyList = () => {
  const { companies, loading } = useCompanyContext();

  return (
    <Grid style={{ height: "100vh", background: "#F5F5F5", padding: "2rem 3rem" }}>
      {loading ? (
        // Render skeletons while loading
        Array.from({ length: 6 }).map((_, index) => (
          <Grid.Col span={4} key={index}>
            <Skeleton height={200} mt="md" />
          </Grid.Col>
        ))
      ) : companies.length > 0 ? (
        companies.map((company: any) => (
          <Grid.Col span={4} key={company.id}>
            <Card shadow='xl' p="lg" mb="sm" radius="md" style={{ height: '100%' }}>
              <Text fw={500} mb="xs">
                <strong>Owner Name:</strong> {company.ownerName}
              </Text>
              <Text fw={500} mb="xs">
                <strong>Name:</strong> {company.name}
              </Text>
              <Text fw={500} mb="xs">
                <strong>Reference:</strong> {company.reference}
              </Text>
              <Text fw={500} mb="xs">
                <strong>Type:</strong> {company.type}
              </Text>
              <Text fw={500} mb="xs">
                <strong>Company Size Code:</strong> {company.companySizeCode}
              </Text>
              {company.status ? (
                  <Badge color={company.status.color} variant="light">
                    {company.status.name} - Position {company.status.position}
                  </Badge>
                ) : (
                  <Badge color="gray" variant="light">
                    No Status
                  </Badge>
                )}
            
              {/* Optional Buttons */}
              {/* <Button onClick={() => navigate(`/company/${company.id}`)} mt="md">
                View
              </Button>
              <Button onClick={() => navigate(`/company/edit/${company.id}`)} ml="sm" mt="md">
                Edit
              </Button> */}
            </Card>
          </Grid.Col>
        ))
      ) : (
        <Grid.Col span={12}>
          <p>No companies found.</p>
        </Grid.Col>
      )}
    </Grid>
  );
};

export default CompanyList;
