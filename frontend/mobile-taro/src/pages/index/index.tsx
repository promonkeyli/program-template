import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './index.css'
import {fetchUserProfile} from "@/services/user";

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })

  useLoad(() => {
    fetchUserProfile("1")
  })

  return (
    <View className='w-full h-screen bg-amber-300'>
      <Text></Text>
    </View>
  )
}
