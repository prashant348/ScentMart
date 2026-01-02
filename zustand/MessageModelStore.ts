import { create } from "zustand";

interface MessageModelStoreProps {
    isMsgModelOpen: boolean;
    modelMsg: string;
    setIsMsgModelOpen: (isOpen: boolean, msg: string) => void;
}

export const useMessageModelStore = create<MessageModelStoreProps>((set) => ({
    isMsgModelOpen: false,
    modelMsg: "",
    setIsMsgModelOpen: (isOpen: boolean, msg: string) => set({ isMsgModelOpen: isOpen, modelMsg: msg }),
}));