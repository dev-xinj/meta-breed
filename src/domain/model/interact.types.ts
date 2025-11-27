import { Account } from "../users/account.types";

export type Interact = {
  accounts: Account[];
  delayActive: number;
  behavior: Behavior;
  comments: Comment;
};

export type Behavior = {
  behaviorType: "DEFAULT" | "REACTION" | "NONE";
  reactionDetails: Map<Emot, number>;
};
export type Comment = {
  isComment: boolean;
  contentComments: ContentComments[];
};
export enum Emot {
  "like",
  "haha",
  "wow",
  "sad",
}
export type ContentComments = {
  id: string;
  content: string;
};
