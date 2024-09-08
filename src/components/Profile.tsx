import { Center, Paper, Text } from '@mantine/core'

const Profile = () => {
  return (
    <Center style={{ height: '80vh', background: '#F5F5F5' }} color="blue">
    <Paper shadow="md" withBorder style={{ width: '300px', textAlign: 'center' }}>
      <Text size="lg" mt="md" mb='md'>
        Welcome To Recruitly
      </Text>
      <Text size="lg" mb="md"  color="blue">
        Hello  Admin..!!
      </Text>
     
    </Paper>
  </Center>
  )
}

export default Profile