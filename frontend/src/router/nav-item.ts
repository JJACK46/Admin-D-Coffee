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
    title: 'home',
    icon: 'mdi-home',
    path: '/'
  },
  {
    title: 'report',
    icon: 'mdi-notebook',
    path: '/report'
  },
  {
    title: 'management',
    icon: 'mdi-pencil',
    menu: [
      {
        title: 'inventory',
        path: '/inventory',
        icon: 'mdi-warehouse'
      },
      {
        title: 'payroll',
        icon: 'mdi-currency-usd',
        path: '/payroll'
      },
      {
        title: 'customer',
        path: '/customer',
        icon: 'mdi-wallet-membership'
      },
      {
        title: 'promotion',
        path: '/promotion',
        icon: 'mdi-ticket-percent-outline'
      },
      {
        title: 'product',
        path: '/product',
        icon: 'mdi-food'
      },
      {
        title: 'employee',
        path: '/employee',
        icon: 'mdi-account-group-outline'
      },
      {
        title: 'user',
        path: '/users',
        icon: 'mdi-account-multiple'
      },
      {
        title: 'branch',
        path: '/branch',
        icon: 'mdi-store'
      },
      {
        title: 'ingredient',
        path: '/ingredient',
        icon: 'mdi-coffee'
      }
    ]
  },
  {
    title: 'records',
    icon: 'mdi-note-text',
    menu: [
      {
        title: 'attendance',
        path: '/attendance',
        icon: 'mdi-clock'
      },
      {
        title: 'receipt',
        path: '/receipt',
        icon: 'mdi-note-text'
      },
      {
        title: 'bill',
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
    title: 'about',
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
