import { NextPage } from "next";
import { getPostAPI } from "../../../lib/api/board";
import { boardActions } from "../../../store/board";
import wrapper from "../../../store";
import { Store } from "redux";
import { NextPageContext } from "next/types";
import Update from "../../../components/views/board/Update";

const postUpdate: NextPage = () => {
  return <Update />;
};

export default postUpdate;
