import { ref } from 'vue'

type CardInfo = {
  name: string
  id: string
  role: string
  urlImg: string
  urlLink: string
  describe: string
}

export const useAboutStore = () => {
  const cards = ref<CardInfo[]>([
    {
      name: 'Aphidech Mahakoat',
      id: '65160312',
      role: 'DevOps & App Developer',
      urlImg: 'https://gitlab.com/uploads/-/system/user/avatar/15029878/avatar.png?width=400"',
      urlLink: 'https://gitlab.com/65160312',
      describe:
        "As the coding team leader, I seamlessly integrate code contributions, address minor bugs, and strategically plan the application's structure."
    },
    {
      name: 'Atchara Bunserm',
      id: '65160207',
      role: 'role',
      urlImg: 'https://gitlab.com/uploads/-/system/user/avatar/15029901/avatar.png?width=400',
      urlLink: 'https://gitlab.com/65160207',
      describe: 'Have a password to access the Internet'
    },
    {
      name: 'Atichon Prayoonsak',
      id: '65160204',
      role: 'role',
      urlImg: 'https://gitlab.com/uploads/-/system/user/avatar/15029955/avatar.png?width=400',
      urlLink: 'https://gitlab.com/65160204',
      describe: 'Hiw kao mak loei'
    },
    {
      name: 'Chaiyaporn Kaewsuma',
      id: '65160156',
      role: 'Full-Stack Developer',
      urlImg: 'https://gitlab.com/uploads/-/system/user/avatar/14340342/avatar.png?width=400',
      urlLink: 'https://gitlab.com/65160156',
      describe: 'I am a new developer who is practicing and improving my skills.'
    },
    {
      name: 'Chonthicha Phewlaong',
      id: '65160153',
      role: 'role',
      urlImg: 'https://gitlab.com/uploads/-/system/user/avatar/15029888/avatar.png?width=400',
      urlLink: 'https://gitlab.com/65160153',
      describe:
        'Continuously study and research for knowledge to be used to develop programs to be more efficient.'
    },
    {
      name: 'Sirikon Yeeyauan',
      id: '65160201',
      role: 'role',
      urlImg: 'https://gitlab.com/uploads/-/system/user/avatar/15029899/avatar.png?width=400',
      urlLink: 'https://gitlab.com/65160201',
      describe: 'Happiness is the real sense of fulfillment that comes from hard work.'
    },
    {
      name: 'Sitipong Wongchareon',
      id: '65160200',
      role: 'role',
      urlImg: 'url Img',
      urlLink: 'url link something',
      describe: 'how good you are'
    },
    {
      name: 'Supphakorn Saengjit',
      id: '65160196',
      role: 'role',
      urlImg: 'url Img',
      urlLink: 'url link something',
      describe: 'how good you are'
    },
    {
      name: 'Thanawan Wongwian',
      id: '65160170',
      role: 'Desingner',
      urlImg: 'https://gitlab.com/uploads/-/system/user/avatar/15029884/avatar.png?width=400',
      urlLink: 'https://gitlab.com/65160170',
      describe: "'I don't know'"
    }
  ])

  return { cards }
}
