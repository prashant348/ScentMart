import { create } from "zustand";

interface OrderConfirmationModelStoreState {
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
}

export const useOrderConfirmationModelStore = create<OrderConfirmationModelStoreState>((set) => ({
    isOpen: false,
    setOpen: (isOpen: boolean) => set({ isOpen }), 
}));