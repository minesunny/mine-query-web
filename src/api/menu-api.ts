import instance from "@/lib/axios";
import { DataNode } from "@/models/data-node";
import { Menu } from "@/models/menu";
import { useQuery } from "@tanstack/react-query";

const getMenu = (body: DataNode): Promise<Menu[]> => {
  return instance.post<DataNode, Menu[]>("/menu", body);
};
export const menuApi = {
  getMenu,
};
const useGetMenu = (node: DataNode) => {
  return useQuery({
    queryKey: ["getMenu", node],
    queryFn: () => getMenu(node),
  });
};

export const useMenuApi = {
  getMenu: useGetMenu,
};
