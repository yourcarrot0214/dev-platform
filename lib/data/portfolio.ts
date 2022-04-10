export interface Portfolio {
  id: number;
  title: string;
  summary: string;
  tags: string[];
  path: string;
  target: string;
}

export const implementList: Portfolio[] = [
  {
    id: 1,
    title: "Board",
    summary: "게시판",
    tags: ["Redux-toolkit", "Next.js"],
    path: `${process.env.NEXT_PUBLIC_API_URL}/board`,
    target: "",
  },
  {
    id: 2,
    title: "Chat",
    summary: "실시간 채팅",
    tags: ["Socket.io", "Next.js"],
    path: `${process.env.NEXT_PUBLIC_API_URL}/chat`,
    target: "",
  },
];

export const projectList: Portfolio[] = [
  {
    id: 1,
    title: "Twitter",
    summary: "트위터 클론코딩 프로젝트",
    tags: ["Firebase", "React.js", "express"],
    path: "https://yourcarrot0214.github.io/carrotfield",
    target: "_blank",
  },
  {
    id: 2,
    title: "SkillTree",
    summary: "스터디 커뮤니티 서비스",
    tags: ["React.js", "MongoDB", "express"],
    path: "https://devcarrot-skilltree.herokuapp.com/",
    target: "_blank",
  },
];
