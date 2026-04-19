export const adminNavbarConfig = [
  {
    name: 'Banner',
    icon: <i data-feather="image"></i>,
    path: '/admin/banner'
  },
  {
    name: 'User',
    icon: <i data-feather="users"></i>,
    children: [
      { name: 'Real', path: '/admin/user' },
      { name: 'Fake', path: '/admin/fakeUser' }
    ]
  },
  {
    name: 'Host',
    icon: <i data-feather="user-check"></i>,
    children: [
      { name: 'Host', path: '/admin/host' },
      { name: 'Host Request', path: '/admin/hostRequest' }
    ]
  },
  {
    name: 'Broadcast',
    icon: <i data-feather="radio"></i>,
    children: [
      { name: 'Broadcast Gift', path: '/admin/broadcastgift' },
      { name: 'Broadcast Game', path: '/admin/broadcastgame' }
    ]
  },
  {
    name: 'Agency',
    icon: <i data-feather="image"></i>,
    children: [
      { name: 'Agency', path: '/admin/agency' },
      { name: 'Agency History', path: '/admin/agencyHistory' },
      { name: 'Agency Redeem', path: '/admin/agencyRedeemRequest' }
    ]
  },
  {
    name: 'User Redeem',
    icon: <i data-feather="key"></i>,
    path: '/admin/userRedeemRequest'
  },
  {
    name: 'Plan',
    icon: <i data-feather="layout"></i>,
    path: '/admin/mainPlan'
  },
  {
    name: 'Plan History',
    icon: <i data-feather="clock"></i>,
    path: '/admin/planHistory'
  },
  {
    name: 'Game History',
    icon: <i data-feather="hash"></i>,
    path: '/admin/gameHistory'
  },
  {
    name: 'Gift',
    icon: <i data-feather="gift"></i>,
    children: [
      {
        name: 'Category',
        path: '/admin/giftCategory',
        onClick: () => sessionStorage.removeItem('GiftClick')
      },
      {
        name: 'Gift',
        path: '/admin/gift',
        onClick: () => sessionStorage.setItem('GiftClick', true)
      }
    ]
  },
  {
    name: 'Reaction',
    icon: <i className="far fa-smile-wink" style={{ fontSize: '23px' }}></i>,
    path: '/admin/reaction'
  },
  {
    name: 'Store',
    icon: <i data-feather="loader"></i>,
    children: [
      { name: 'Entry Effect', path: '/admin/entryEffect' },
      { name: 'Avatar Frame', path: '/admin/avatarFrame' }
    ]
  },
  {
    name: 'Theme',
    icon: <i data-feather="image"></i>,
    path: '/admin/theme'
  },
  {
    name: 'Song',
    icon: <i data-feather="music"></i>,
    path: '/admin/song'
  },
  {
    name: 'Hashtag',
    icon: <i data-feather="hash"></i>,
    path: '/admin/hashtag'
  },
  {
    name: 'Fake Comment',
    icon: <i data-feather="message-circle"></i>,
    path: '/admin/comment'
  },
  {
    name: 'Level',
    icon: <i data-feather="bar-chart"></i>,
    path: '/admin/level'
  },
  {
    name: 'Post',
    icon: <i data-feather="maximize"></i>,
    path: '/admin/mainPost'
  },
  {
    name: 'Video',
    icon: <i data-feather="film"></i>,
    path: '/admin/mainVideo'
  },
  {
    name: 'Reported User',
    icon: <i data-feather="flag"></i>,
    path: '/admin/reportedUser'
  },
  {
    name: 'Complain Request',
    icon: <i data-feather="help-circle"></i>,
    path: '/admin/complainRequest'
  },
  {
    name: 'Suggested Message',
    icon: <i data-feather="message-square"></i>,
    path: '/admin/suggestMessage'
  },
  {
    name: 'Google Ad',
    icon: <i data-feather="book"></i>,
    path: '/admin/advertisement'
  },
  {
    name: 'Setting',
    icon: <i data-feather="settings"></i>,
    path: '/admin/Setting'
  },
  {
    name: 'Profile',
    icon: <i data-feather="user"></i>,
    path: '/admin/adminProfile'
  }
];

export const adminModulesConfigForRole = (() => {
  const sections = [];
  const uniqueModules = [];
  adminNavbarConfig.forEach((item) => {
    const section = item.name;
    if (!sections.includes(section)) sections.push(section);
    if (item.children) {
      (item.children || []).forEach((child) => {
        const path = child.path || '';
        const key = path.replace(/^\//, '');
        if (key) {
          uniqueModules.push({
            key,
            name: child.name,
            section,
            icon: item.icon,
          });
        }
      });
    } else {
      const path = item.path || '';
      const key = path.replace(/^\//, '');
      if (key) {
        uniqueModules.push({
          key,
          name: item.name,
          section,
          icon: item.icon,
        });
      }
    }
  });
  return { sections, uniqueModules };
})();