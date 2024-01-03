import { TimerScreen } from './src/components/screens/TimerScreen'
import { UpperMenu } from './src/components/menus/UpperMenu'
import { SafeAreaView } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <UpperMenu />
        <TimerScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default App
