import { View, Image, Text } from '@tarojs/components';
import './index.less';

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: string;
}

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <View className='product-grid-container'>
      <Text className='product-grid-title'>为你推荐</Text>
      <View className='product-grid'>
        {products.map(product => (
          <View key={product.id} className='product-card'>
            <Image className='product-image' src={product.imageUrl} mode='aspectFill' />
            <View className='product-info'>
              <Text className='product-name'>{product.name}</Text>
              <Text className='product-price'>¥{product.price}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ProductGrid;
