import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface MenuItem {
  id: string;
  name: string;
  parentId?: string | null;
  depth: number;
  createdAt: string;
  updatedAt: string;
}

export interface MenuItemComponent {
  id: string;
  name: string;
  parentId?: string | null;
  depth: number;
  createdAt: string;
  updatedAt: string;
  children?: MenuItem[];
}

interface MenuState {
  menu: MenuItem[];
  activeMenu: MenuItem | null;
  newMenu: MenuItem | null;
  menuOption: { id: string; name: string } | null;
  expandedNodes: Record<string, boolean>;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  otherState: string;
}

const initialState: MenuState = {
  menu: [
    {
      id: "1",
      name: "Systems",
      parentId: null,
      depth: 1,
      createdAt: "",
      updatedAt: "",
    },

    {
      id: "2",
      name: "System Code",
      parentId: "1",
      depth: 2,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "3",
      name: "Code Registration",
      parentId: "2",
      depth: 3,
      createdAt: "",
      updatedAt: "",
    },

    {
      id: "4",
      name: "Code Registration-2",
      parentId: "1",
      depth: 2,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "5",
      name: "Properties",
      parentId: "1",
      depth: 2,
      createdAt: "",
      updatedAt: "",
    },

    {
      id: "6",
      name: "Menus",
      parentId: "1",
      depth: 2,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "7",
      name: "MenusRegistration",
      parentId: "6",
      depth: 3,
      createdAt: "",
      updatedAt: "",
    },

    {
      id: "8",
      name: "API List",
      parentId: "1",
      depth: 2,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "9",
      name: "API Registration",
      parentId: "8",
      depth: 3,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "10",
      name: "API Edit",
      parentId: "8",
      depth: 3,
      createdAt: "",
      updatedAt: "",
    },

    {
      id: "11",
      name: "Users & Groups",
      parentId: null,
      depth: 1,
      createdAt: "",
      updatedAt: "",
    },

    {
      id: "12",
      name: "Users",
      parentId: "11",
      depth: 2,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "13",
      name: "User Account Registration",
      parentId: "12",
      depth: 3,
      createdAt: "",
      updatedAt: "",
    },

    {
      id: "14",
      name: "Group",
      parentId: "11",
      depth: 2,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "15",
      name: "User Group Registration",
      parentId: "14",
      depth: 3,
      createdAt: "",
      updatedAt: "",
    },

    {
      id: "16",
      name: "사용자 승인",
      parentId: "11",
      depth: 2,
      createdAt: "",
      updatedAt: "",
    },
    {
      id: "17",
      name: "사용자 승인 상세",
      parentId: "16",
      depth: 3,
      createdAt: "",
      updatedAt: "",
    },
  ],
  activeMenu: null,
  newMenu: null,
  menuOption: null,
  expandedNodes: {},
  status: "idle",
  error: null,
  otherState: "",
};

// Async thunk to fetch menu
export const fetchMenu = createAsyncThunk("menu/fetchMenu", async () => {
  const response = await fetch("/api/menu"); // Replace with your API endpoint
  if (!response.ok) {
    throw new Error("Failed to fetch menu");
  }
  return (await response.json()) as { id: number; name: string }[];
});

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setOtherState: (state, action: PayloadAction<string>) => {
      state.otherState = action.payload;
    },
    setActiveMenu: (state, action: PayloadAction<MenuItem>) => {
      state.activeMenu = action.payload;
    },
    setMenuOption: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      state.menuOption = action.payload;
    },
    setExpandedNodes: (
      state,
      action: PayloadAction<Record<string, boolean>>
    ) => {
      state.expandedNodes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMenu.fulfilled, (state) => {
        state.status = "succeeded";
        // state.menu = action.payload;
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });
  },
});

export const { setOtherState, setActiveMenu, setMenuOption, setExpandedNodes } =
  menuSlice.actions;
export default menuSlice.reducer;
