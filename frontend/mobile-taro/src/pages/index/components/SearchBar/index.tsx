import { View, Input } from '@tarojs/components';
import './index.less';

const SearchBar = () => {
  return (
    <View className='search-bar-container'>
      <View className='search-bar'>
        <Input className='search-input' placeholder='搜索商品' />
      </View>
    </View>
  );
};

export default SearchBar;
