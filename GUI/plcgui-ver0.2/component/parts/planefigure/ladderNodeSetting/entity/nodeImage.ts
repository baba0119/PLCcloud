import a from "./images/a.png";
import b from "./images/b.png";
import contact from "./images/contact.png";
import relay from "./images/output.png";
import none from "./images/none.png";

type NodeImageModel = {
  [index: string]: {
    src: StaticImageData
    alt: string
  }
}

export const NodeImageList: NodeImageModel = {};

NodeImageList["vrA"] = {
  src: a,
  alt: "a接点"
};
NodeImageList["vrB"] = {
  src: b,
  alt: "b接点"
};
NodeImageList["gpA"] = {
  src: a,
  alt: "a接点"
};
NodeImageList["gpB"] = {
  src: b,
  alt: "b接点"
};
NodeImageList["contact"] = {
  src: contact,
  alt: "接続線"
};
NodeImageList["vrio"] = {
  src: relay,
  alt: "出力接点"
};
NodeImageList["gpio"] = {
  src: relay,
  alt: "出力接点"
};
NodeImageList[""] = {
  src: none,
  alt: "none"
};