export interface IAccount{
    id: number
    name: string
    remoteEmail: string
}

export const getAccountList = () :IAccount[] => {
  return [
    {
      id: 0,
      name: 'Chris',
      remoteEmail: 'C123456789'
    },
    {
      id: 1,
      name: 'Timmy',
      remoteEmail: 'T123456789'
    },
    {
      id: 2,
      name: 'Eric',
      remoteEmail: 'E123456789'
    },
    {
      id: 3,
      name: 'Jason',
      remoteEmail: 'J123456789'
    },
    {
      id: 4,
      name: 'Wayne',
      remoteEmail: 'W123456789'
    }
  ]
}
