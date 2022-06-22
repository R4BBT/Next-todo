import { extendTheme } from '@chakra-ui/react'
import colors from './colors'
import config from './config'

const theme = extendTheme({ config, colors })

export default theme
