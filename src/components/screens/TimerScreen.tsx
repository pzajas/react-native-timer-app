import { useState, useEffect } from 'react'
import { View, Text, PanResponder, StyleSheet, Pressable } from 'react-native'

export const TimerScreen = () => {
  const [startingTime, setStartingTime] = useState<number>()
  const [currentTime, setCurrentTime] = useState<number>()
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | undefined>()
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [totalSeconds, setTotalSeconds] = useState(0)
  const [isTimerOn, setIsTimerOn] = useState(false)

  const updateTotalSeconds = () => {
    setTotalSeconds(hours * 3600 + minutes * 60 + seconds)
  }

  const createPanResponder = (onMove: (delta: number) => void) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => !isTimerOn,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (_, gestureState) => {
        const sensitivity = 0.05
        const delta = -gestureState.dy * sensitivity

        if (!isTimerOn) {
          onMove(delta)
        }
      },
    })
  }

  const handleHoursMove = (delta: number) => {
    const newHours = (hours + Math.round(delta)) % 24
    setHours(newHours >= 0 ? newHours : 24 + newHours)
  }

  const handleMinutesMove = (delta: number) => {
    const newMinutes = (minutes + Math.round(delta)) % 60
    setMinutes(newMinutes >= 0 ? newMinutes : 60 + newMinutes)
  }

  const handleSecondsMove = (delta: number) => {
    const newSeconds = (seconds + Math.round(delta)) % 60
    setSeconds(newSeconds >= 0 ? newSeconds : 60 + newSeconds)
  }

  useEffect(() => {
    updateTotalSeconds()
  }, [hours, minutes, seconds])

  useEffect(() => {
    if (startingTime) {
      const _intervalId = setInterval(() => {
        setCurrentTime(new Date().valueOf())
      }, 100)
      setIntervalId(_intervalId)
    }
    return () => {
      clearInterval(intervalId)
    }
  }, [startingTime])

  useEffect(() => {
    if (startingTime && currentTime) {
      const elapsedMilliseconds = startingTime - currentTime
      const toDisp = Math.floor(elapsedMilliseconds / 1000)

      if (toDisp >= 0) {
        setSeconds(toDisp % 60)
        setMinutes(Math.floor((toDisp / 60) % 60))
        setHours(Math.floor(toDisp / 3600))
        setTotalSeconds(toDisp)
      } else {
        handleResetCurrentTime()
      }
    }
  }, [currentTime])

  useEffect(() => {
    if (totalSeconds === 0) {
      clearInterval(intervalId)
    }
  }, [totalSeconds])

  const toggleTimer = () => {
    if (!isTimerOn) {
      const t = new Date()
      t.setHours(t.getHours() + hours)
      t.setMinutes(t.getMinutes() + minutes)
      t.setSeconds(t.getSeconds() + seconds)
      setStartingTime(t.valueOf())
      setIsTimerOn(true)
    } else {
      clearInterval(intervalId)
      setIsTimerOn(false)
    }
  }

  const handleResetCurrentTime = () => {
    setHours(0)
    setMinutes(0)
    setSeconds(0)
    setTotalSeconds(0)
    setIsTimerOn(false)
  }

  return (
    <View>
      <View style={styles.timerContainer}>
        <View style={styles.timeUnitContainer}>
          <Text style={styles.timeUnitText}>
            {String((Math.floor((totalSeconds % (24 * 3600)) / 3600) + 1) % 24).padStart(2, '0')}
          </Text>
          <Text
            style={{
              fontSize: 22,
              textAlign: 'center',
              marginVertical: 10,
              marginRight: 6,
              fontWeight: '600',
              fontFamily: 'PoppinsBold',
              color: 'black',
            }}
            suppressHighlighting={true}
            {...createPanResponder(handleHoursMove).panHandlers}
          >
            {`${String(hours).padStart(2, '0')}`} <Text style={{ fontSize: 14 }}>h</Text>
          </Text>
          <Text style={styles.timeUnitText}>
            {String((Math.floor((totalSeconds % (24 * 3600)) / 3600) + 23) % 24).padStart(2, '0')}
          </Text>
        </View>
        <View style={styles.timeUnitContainer}>
          <Text style={styles.timeUnitText}>
            {String((Math.floor((totalSeconds % 3600) / 60) + 1) % 60).padStart(2, '0')}
          </Text>
          <Text
            style={{
              fontSize: 22,
              textAlign: 'center',
              marginVertical: 10,
              marginRight: 6,
              fontWeight: '600',
              fontFamily: 'PoppinsBold',
              color: 'black',
            }}
            suppressHighlighting={true}
            {...createPanResponder(handleMinutesMove).panHandlers}
          >
            {`${String(minutes).padStart(2, '0')}`} <Text style={{ fontSize: 14 }}>min</Text>
          </Text>
          <Text style={styles.timeUnitText}>
            {String((Math.floor((totalSeconds % 3600) / 60) + 59) % 60).padStart(2, '0')}
          </Text>
        </View>
        <View style={styles.timeUnitContainer}>
          <Text style={styles.timeUnitText}>{String(((totalSeconds % 60) + 1) % 60).padStart(2, '0')}</Text>
          <Text
            style={{
              fontSize: 22,
              textAlign: 'center',
              marginVertical: 10,
              marginRight: 6,
              fontWeight: '600',
              fontFamily: 'PoppinsBold',
              color: 'black',
            }}
            suppressHighlighting={true}
            {...createPanResponder(handleSecondsMove).panHandlers}
          >
            {`${String(seconds).padStart(2, '0')}`} <Text style={{ fontSize: 14 }}>sek</Text>
          </Text>
          <Text style={styles.timeUnitText}>{String(((totalSeconds % 60) + 59) % 60).padStart(2, '0')}</Text>
        </View>
      </View>
      <View style={styles.timerButtonContainer}>
        <Pressable onPress={handleResetCurrentTime}>
          <Text>Wyzeruj</Text>
        </Pressable>
        <Pressable onPress={toggleTimer}>
          <Text>{isTimerOn ? 'Stop' : 'Start'}</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginHorizontal: 54,
    textSelectable: false,
  },
  timerButtonContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 32,
    marginTop: 48,
    textSelectable: false,
  },
  timeUnitContainer: {
    width: '30%',
    alignItems: 'flex-start',
    justifyContent: 'center',
    pointerEvents: 'box-none',
  },
  timeUnitText: {
    fontSize: 16,
    color: '#D7D7D7',
    fontWeight: '600',
  },
})
