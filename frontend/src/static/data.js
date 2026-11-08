import React from "react";
import { FiHeadphones, FiRefreshCw, FiTruck } from "react-icons/fi";

// navigation Data
export const navItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Best Selling",
    url: "/best-selling",
  },
  {
    title: "Products",
    url: "/products",
  },
  {
    title: "Events",
    url: "/events",
  },
  {
    title: "FAQ",
    url: "/faq",
  },
];

export const brandingData = [
  {
    id: 1,
    title: "Free Shipping",
    Description: "Free shipping on orders over $100",
    icon: React.createElement(FiTruck, { "aria-hidden": true, size: 32 }),
  },
  {
    id: 2,
    title: "Easy Returns",
    Description: "30-day hassle-free returns",
    icon: React.createElement(FiRefreshCw, { "aria-hidden": true, size: 32 }),
  },
  {
    id: 3,
    title: "Customer Support",
    Description: "We're here to help, anytime",
    icon: React.createElement(FiHeadphones, { "aria-hidden": true, size: 32 }),
  },
];

export const categoriesData = [
  {
    id: 1,
    title: "Electronics",
    subTitle: "Gadgets and devices",
    image_Url: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=80&h=80&fit=crop",
  },
  {
    id: 2,
    title: "Fashion",
    subTitle: "Clothing and accessories",
    image_Url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=80&h=80&fit=crop",
  },
  {
    id: 3,
    title: "Home & Living",
    subTitle: "Make your home comfortable",
    image_Url: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=80&h=80&fit=crop",
  },
  {
    id: 4,
    title: "Beauty",
    subTitle: "Beauty and personal care",
    image_Url: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=80&h=80&fit=crop",
  },
  {
    id: 5,
    title: "Sports",
    subTitle: "Gear for active lifestyles",
    image_Url: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=80&h=80&fit=crop",
  },
];

export const productData = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    shop: { name: "Sound House" },
    price: 89,
    discount_price: 69,
    total_sell: 128,
    ratings: 4,
    description: "Comfortable wireless headphones with rich everyday sound.",
    image_Url: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop",
      },
    ],
  },
  {
    id: 2,
    name: "Classic Leather Backpack",
    category: "Fashion",
    shop: { name: "Everyday Goods" },
    price: 120,
    discount_price: 95,
    total_sell: 96,
    ratings: 5,
    description: "A versatile backpack for work, travel, and daily use.",
    image_Url: [
      {
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=120&h=120&fit=crop",
      },
    ],
  },
  {
    id: 3,
    name: "Minimal Desk Lamp",
    category: "Home & Living",
    shop: { name: "Warm Spaces" },
    price: 65,
    discount_price: 49,
    total_sell: 84,
    ratings: 4,
    description: "A clean, modern lamp to bring a warm glow to your desk.",
    image_Url: [
      {
        url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=120&h=120&fit=crop",
      },
    ],
  },
  {
    id: 4,
    name: "Daily Skincare Set",
    category: "Beauty",
    shop: { name: "Daily Ritual" },
    price: 54,
    discount_price: 42,
    total_sell: 62,
    ratings: 5,
    description: "A simple skincare routine for a fresh, hydrated feel.",
    image_Url: [
      {
        url: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=120&h=120&fit=crop",
      },
    ],
  },
  {
    id: 5,
    name: "Performance Running Shoes",
    category: "Sports",
    shop: { name: "Active Life" },
    price: 110,
    discount_price: 88,
    total_sell: 45,
    ratings: 4,
    description: "Lightweight running shoes made for everyday training.",
    image_Url: [
      {
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop",
      },
    ],
  },
];

export const footerProductLinks = [
  {
    name: "About us",
    link: "/about",
  },
  {
    name: "Careers",
    link: "/carrers",
  },
  {
    name: "Store Locations",
  },
  {
    name: "Our Blog",
  },
  {
    name: "Reviews",
  },
];

export const footercompanyLinks = [
  {
    name: "Game & Video",
  },
  {
    name: "Phone &Tablets",
  },
  {
    name: "Computers & Laptop",
  },
  {
    name: "Sport Watches",
  },
  {
    name: "Events",
  },
];

export const footerSupportLinks = [
  {
    name: "FAQ",
  },
  {
    name: "Reviews",
  },
  {
    name: "Contact Us",
  },
  {
    name: "Shipping",
  },
  {
    name: "Live chat",
  },
];
