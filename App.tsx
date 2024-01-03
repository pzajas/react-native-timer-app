import { UpperMenu } from './src/components/menus/UpperMenu'
import { Text, SafeAreaView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <UpperMenu />
        <Text>Timer App</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default App
