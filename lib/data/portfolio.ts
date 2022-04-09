export interface Portfolio {
  id: number;
  title: string;
  summary: string;
  tags: string[];
  path: string;
  target: string;
}

export const list: Portfolio[] = [
  {
    id: 1,
    title: "Board",
    summary: "게시판 기능을 구현합니다.",
    tags: ["Redux-toolkit", "Next.js"],
    path: `${process.env.NEXT_PUBLIC_API_URL}/board`,
    target: "",
  },
  {
    id: 2,
    title: "Chat",
    summary: "실시간 채팅 기능을 구현합니다.",
    tags: ["Socket.io", "Next.js"],
    path: `${process.env.NEXT_PUBLIC_API_URL}/chat`,
    target: "",
  },
  {
    id: 3,
    title: "Twitter",
    summary: "트윗 기능 클론 서비스입니다.",
    tags: ["Firebase", "React.js", "express"],
    path: "https://yourcarrot0214.github.io/carrotfield",
    target: "_blank",
  },
  {
    id: 4,
    title: "SkillTree",
    summary: "스터디 커뮤니티 서비스입니다.",
    tags: ["React.js", "MongoDB", "express"],
    path: "https://devcarrot-skilltree.herokuapp.com/",
    target: "_blank",
  },
];
