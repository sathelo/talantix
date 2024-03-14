import $http from "../api";

import { TPost, TUser } from "./placeholder.types";

export class PlaceholderService {
  static async getPosts(): Promise<TPost[]> {
    const res = await $http.get("/posts");
    return res.data;
  }

  static async getUsers(): Promise<TUser[]> {
    const res = await $http.get(`/users`);
    return res.data;
  }
}
