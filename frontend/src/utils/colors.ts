import { useTheme } from 'vuetify'

export function getColorByMode() {
  const theme = useTheme()
  if (theme.current.value.dark) {
    return 'white'
  }
  return 'black'
}
