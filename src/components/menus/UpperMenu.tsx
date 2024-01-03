import { StyleSheet, View } from 'react-native'
import { Appbar } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Feather'

export const UpperMenu = () => {
  return (
    <>
      <Appbar.Header theme={{ colors: 'white' }}>
        <View style={styles.upperMenu}>
          <View style={styles.menuIcon}>
            <Icon name="menu" size={24} padding={20} color={'black'} />
          </View>
        </View>
      </Appbar.Header>
    </>
  )
}

const styles = StyleSheet.create({
  upperMenu: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
  },
  imageIcon: {
    width: 104,
    height: 59,
  },
  menuIcon: {
    position: 'absolute',
    right: 0,
  },
})
