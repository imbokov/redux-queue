import { schema } from "normalizr";

import { POST, COMMENT } from "constants/entities";

export const postSchema = new schema.Entity(POST);
export const postListSchema = [postSchema];

export const commentSchema = new schema.Entity(COMMENT);
export const commentListSchema = [commentSchema];
