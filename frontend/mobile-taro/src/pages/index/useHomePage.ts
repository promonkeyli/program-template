import { useState, useEffect } from 'react';

// Mock Data - in a real app, this would come from an API
const mockBanners = [
  { id: 1, imageUrl: 'https://via.placeholder.com/710x300/6190E8/FFFFFF?text=Promotion+1' },
  { id: 2, imageUrl: 'https://via.placeholder.com/710x300/13CE66/FFFFFF?text=New+Arrivals' },
  { id: 3, imageUrl: 'https://via.placeholder.com/710x300/FFC82C/FFFFFF?text=Flash+Sale' },
];

const mockCategories = [
  { id: 1, name: '手机数码', iconUrl: 'https://via.placeholder.com/80x80/E0E0E0/000000?text=Elec' },
  { id: 2, name: '女装', iconUrl: 'https://via.placeholder.com/80x80/E0E0E0/000000?text=Women' },
  { id: 3, name: '男装', iconUrl: 'https://via.placeholder.com/80x80/E0E0E0/000000?text=Men' },
  { id: 4, name: '家用电器', iconUrl: 'https://via.placeholder.com/80x80/E0E0E0/000000?text=Home' },
  { id: 5, name: '美妆护肤', iconUrl: 'https://via.placeholder.com/80x80/E0E0E0/000000?text=Beauty' },
  { id: 6, name: '运动户外', iconUrl: 'https://via.placeholder.com/80x80/E0E0E0/000000?text=Sport' },
  { id: 7, name: '水果生鲜', iconUrl: 'https://via.placeholder.com/80x80/E0E0E0/000000?text=Fruit' },
  { id: 8, name: '家居建材', iconUrl: 'https://via.placeholder.com/80x80/E0E0E0/000000?text=Decor' },
  { id: 9, name: '母婴用品', iconUrl: 'https://via.placeholder.com/80x80/E0E0E0/000000?text=Baby' },
  { id: 10, name: '更多', iconUrl: 'https://via.placeholder.com/80x80/E0E0E0/000000?text=More' },
];

const mockProducts = [
  { id: 1, name: 'Taro UI Pro Max - A Revolutionary UI Framework for Modern Apps', imageUrl: 'https://via.placeholder.com/350x300/FF4949/FFFFFF?text=Product+1', price: '999.00' },
  { id: 2, name: 'React Re-rendering Masterclass: Optimize Your App Performance', imageUrl: 'https://via.placeholder.com/350x300/6190E8/FFFFFF?text=Product+2', price: '129.00' },
  { id: 3, name: 'The Ultimate Guide to TypeScript: From Beginner to Expert', imageUrl: 'https://via.placeholder.com/350x300/13CE66/FFFFFF?text=Product+3', price: '88.00' },
  { id: 4, name: 'Less is More: Advanced Styling Techniques with Less.js', imageUrl: 'https://via.placeholder.com/350x300/FFC82C/FFFFFF?text=Product+4', price: '49.90' },
  { id: 5, name: 'Zustand State Management: Lightweight and Powerful', imageUrl: 'https://via.placeholder.com/350x300/000000/FFFFFF?text=Product+5', price: '76.50' },
  { id: 6, name: 'Another Great Product to Fill the Space and Test Wrapping', imageUrl: 'https://via.placeholder.com/350x300/999999/FFFFFF?text=Product+6', price: '199.00' },
];


/**
 * 首页的自定义 Hook，用于封装业务逻辑和数据
 */
export const useHomePage = () => {
  // In a real app, you would use useState and useEffect to fetch data from an API
  // For this template, we are using mock data directly.
  const banners = mockBanners;
  const categories = mockCategories;
  const products = mockProducts;

  return {
    banners,
    categories,
    products,
  };
};
