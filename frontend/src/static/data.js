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
    name: "Wireless Headphones",
    category: "Electronics",
    image_Url: [
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop",
      },
    ],
  },
  {
    name: "Classic Leather Backpack",
    category: "Fashion",
    image_Url: [
      {
        url: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=120&h=120&fit=crop",
      },
    ],
  },
  {
    name: "Minimal Desk Lamp",
    category: "Home & Living",
    image_Url: [
      {
        url: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=120&h=120&fit=crop",
      },
    ],
  },
  {
    name: "Daily Skincare Set",
    category: "Beauty",
    image_Url: [
      {
        url: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=120&h=120&fit=crop",
      },
    ],
  },
  {
    name: "Performance Running Shoes",
    category: "Sports",
    image_Url: [
      {
        url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop",
      },
    ],
  },
];
