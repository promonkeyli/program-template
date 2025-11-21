import { View } from '@tarojs/components';
import { useHomePage } from './useHomePage';
import SearchBar from './components/SearchBar';
import BannerCarousel from './components/BannerCarousel';
import CategoryGrid from './components/CategoryGrid';
import ProductGrid from './components/ProductGrid';
import './index.less';

/**
 * 首页 - 容器组件
 *
 * 职责:
 * 1. 调用 useHomePage Hook 获取所有页面数据。
 * 2. 将数据分发给对应的展示组件。
 * 3. 组织页面整体布局。
 */
export default function Index() {
  const { banners, categories, products } = useHomePage();

  return (
    <View className='home-page'>
      <SearchBar />
      <BannerCarousel banners={banners} />
      <CategoryGrid categories={categories} />
      <ProductGrid products={products} />
    </View>
  );
}
