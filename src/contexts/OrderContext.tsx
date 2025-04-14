import React, { createContext, useContext, useState } from "react";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  orderId: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  paymentInfo: {
    method: string;
    cardNumber: string;
    expiryDate: string;
  };
  shippingMethod: "standard" | "express";
  createdAt: Date;
  updatedAt: Date;
}

interface OrderContextType {
  orders: Order[];
  createOrder: (
    orderData: Omit<Order, "id" | "createdAt" | "updatedAt">
  ) => Promise<Order>;
  updateOrderStatus: (
    orderId: string,
    status: Order["status"]
  ) => Promise<void>;
  getOrderById: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const createOrder = async (
    orderData: Omit<Order, "id" | "createdAt" | "updatedAt">
  ): Promise<Order> => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setOrders((prev) => [...prev, newOrder]);
    return newOrder;
  };

  const updateOrderStatus = async (
    orderId: string,
    status: Order["status"]
  ) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date() }
          : order
      )
    );
  };

  const getOrderById = (orderId: string) => {
    return orders.find((order) => order.id === orderId);
  };

  return (
    <OrderContext.Provider
      value={{ orders, createOrder, updateOrderStatus, getOrderById }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
};
