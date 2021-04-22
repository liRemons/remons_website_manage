import { lazy } from "react";
import {
  CustomerServiceOutlined,
  TeamOutlined,
  ReadOutlined,
  UserOutlined,
  FileWordOutlined,
  MessageOutlined,
} from "@ant-design/icons";
export const option = [
  {
    path: "/login",
    name: "login",
    component: lazy(() => import("@pages/login")),
    title: "登录",
    meta: {
      isPublicCom: true,
    },
  },
  {
    path: "/",
    name: "home",
    component: lazy(() => import("@pages/home")),
    title: "首页",
    meta: {
      isPublicCom: true,
    },
  },
  {
    path: "/markdown",
    name: "markdown",
    component: lazy(() => import("@pages/markdown")),
    title: "mark",
    meta: {
      isPublicCom: true,
    },
  },
  {
    path: "/music",
    name: "music",
    title: "音乐管理",
    icon: <CustomerServiceOutlined />,
    meta: {
      subMenu: true,
    },
    children: [
      {
        path: "/music/singer",
        name: "music-singer",
        component: lazy(() => import("@pages/music/singer")),
        title: "歌手管理",
        meta: {},
      },
      {
        path: "/music/collection",
        name: "music-collection",
        component: lazy(() => import("@pages/music/collection")),
        title: "专辑管理",
        meta: {},
      },
      {
        path: "/music/songList",
        name: "music-songList",
        component: lazy(() => import("@pages/music/songList")),
        title: "歌曲列表",
        meta: {},
      },
    ],
  },
  {
    path: "/user",
    name: "user",
    component: lazy(() => import("@pages/user")),
    title: "用户管理",
    icon: <TeamOutlined />,
    meta: {},
  },
  {
    path: "/content",
    name: "content",
    icon: <ReadOutlined />,
    title: "内容管理",
    meta: {
      subMenu: true,
    },
    children: [
      {
        path: "/content/category",
        name: "content-category",
        title: "技术分类",
        component: lazy(() => import("@pages/content/category")),
        meta: {},
      },
      {
        path: "/content/article",
        name: "content-article",
        title: "文章管理",
        component: lazy(() => import("@pages/content/article")),
        meta: {},
      },
    ],
  },
  {
    path: "/doc",
    name: "doc",
    icon: <FileWordOutlined />,
    component: lazy(() => import("@pages/doc")),
    title: "文档管理",
    meta: {},
  },
  {
    path: "/leaveMsg",
    name: "leaveMsg",
    icon: <MessageOutlined />,
    component: lazy(() => import("@pages/leaveMsg")),
    title: "留言反馈",
    meta: {},
  },
  {
    path: "/myInfo",
    name: "myInfo",
    icon: <UserOutlined />,
    component: lazy(() => import("@pages/myInfo")),
    title: "个人信息",
    meta: {},
  },
];

export const isPublicComOption = option.filter(
  (item) => !item.meta.isPublicCom
);

export const publicComOption = option.filter((item) => item.meta.isPublicCom);
