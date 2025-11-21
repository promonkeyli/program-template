import { Swiper, SwiperItem, Image } from '@tarojs/components';
import './index.less';

interface BannerCarouselProps {
  banners: {
    id: number;
    imageUrl: string;
  }[];
}

const BannerCarousel = ({ banners }: BannerCarouselProps) => {
  return (
    <Swiper
      className='banner-swiper'
      circular
      indicatorDots
      autoplay
    >
      {banners.map(banner => (
        <SwiperItem key={banner.id}>
          <Image className='banner-image' src={banner.imageUrl} mode='aspectFill' />
        </SwiperItem>
      ))}
    </Swiper>
  );
};

export default BannerCarousel;
