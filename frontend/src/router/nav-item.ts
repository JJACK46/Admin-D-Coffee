export type menuNavItem = {
  title: string
  path: string
  icon: string
}

export type navItem = {
  title: string
  icon: string
  menu?: menuNavItem[]
  path?: string
}

export const adminNavItems: navItem[] = [
  {
    title: 'Home',
    icon: 'mdi-home',
    path: '/'
  },
  {
    title: 'Report',
    icon: 'mdi-notebook',
    path: '/report'
  },
  {
    title: 'Management',
    icon: 'mdi-pencil',
    menu: [
      {
        title: 'Inventory',
        path: '/inventory',
        icon: 'mdi-warehouse'
      },
      {
        title: 'Payroll',
        icon: 'mdi-currency-usd',
        path: '/payroll'
      },
      {
        title: 'Customer',
        path: '/customer',
        icon: 'mdi-wallet-membership'
      },
      {
        title: 'Promotion',
        path: '/promotion',
        icon: 'mdi-ticket-percent-outline'
      },
      {
        title: 'Product',
        path: '/product',
        icon: 'mdi-food'
      },
      {
        title: 'Employee',
        path: '/employee',
        icon: 'mdi-account-group-outline'
      },
      {
        title: 'Users',
        path: '/users',
        icon: 'mdi-account-multiple'
      },
      {
        title: 'Branch',
        path: '/branch',
        icon: 'mdi-store'
      },
      {
        title: 'Ingredient',
        path: '/ingredient',
        icon: 'mdi-coffee'
      }
    ]
  },
  {
    title: 'Records',
    icon: 'mdi-note-text',
    menu: [
      {
        title: 'Attendance',
        path: '/attendance',
        icon: 'mdi-clock'
      },
      {
        title: 'Receipt',
        path: '/receipt',
        icon: 'mdi-note-text'
      },
      {
        title: 'Bill',
        path: '/bill',
        icon: 'mdi-note-text'
      }
    ]
  },
  {
    title: 'POS',
    icon: 'mdi-point-of-sale',
    path: '/pos'
  },
  {
    title: 'About',
    icon: 'mdi-information',
    path: '/about'
  }
]

export const employeeNavItems: navItem[] = [
  {
    title: 'Home',
    icon: 'mdi-home',
    path: '/home-employee'
  },
  {
    title: 'Inventory',
    path: '/inventory',
    icon: 'mdi-warehouse'
  },
  {
    title: 'Customer',
    path: '/customer',
    icon: 'mdi-wallet-membership'
  },
  {
    title: 'Attendance',
    path: '/attendance',
    icon: 'mdi-clock'
  },
  {
    title: 'Receipt',
    path: '/receipt',
    icon: 'mdi-note-text'
  },
  {
    title: 'About',
    icon: 'mdi-information',
    path: '/about'
  }
]
export const managerNavItems: navItem[] = [
  {
    title: 'Home',
    icon: 'mdi-home',
    path: '/home-manager'
  },
  {
    title: 'Inventory',
    path: '/inventory',
    icon: 'mdi-warehouse'
  },
  {
    title: 'Customer',
    path: '/customer',
    icon: 'mdi-wallet-membership'
  },
  {
    title: 'Attendance',
    path: '/attendance',
    icon: 'mdi-clock'
  },
  {
    title: 'Receipt',
    path: '/receipt',
    icon: 'mdi-note-text'
  },
  {
    title: 'About',
    icon: 'mdi-information',
    path: '/about'
  }
]
