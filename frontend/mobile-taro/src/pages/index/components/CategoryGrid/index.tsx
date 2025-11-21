import { View, Image, Text } from '@tarojs/components';
import './index.less';

interface CategoryGridProps {
  categories: {
    id: number;
    name: string;
    iconUrl: string;
  }[];
}

const CategoryGrid = ({ categories }: CategoryGridProps) => {
  return (
    <View className='category-grid'>
      {categories.map(category => (
        <View key={category.id} className='category-item'>
          <Image className='category-icon' src={category.iconUrl} />
          <Text className='category-name'>{category.name}</Text>
        </View>
      ))}
    </View>
  );
};

export default CategoryGrid;
