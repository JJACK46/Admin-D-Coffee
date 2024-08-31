import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'
import { useI18n } from 'vue-i18n'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import i18n from './i18n'

const vuetify = createVuetify({
  blueprint: md3,
  locale: {
    adapter: createVueI18nAdapter({ i18n, useI18n })
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#6F4E37',
          secondary: '#654335',
          third: '#51312E',
          fourth: '#432D2B',
          fifth: '#322626'
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: '#6F4E37',
          secondary: '#654335',
          third: '#51312E',
          fourth: '#432D2B',
          fifth: '#322626'
        }
      }
    }
  }
})

export default vuetify
