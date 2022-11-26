import { Quest } from "./quest";
import { Questreqs } from "./questreqs";
import { UserModel } from "./User.model";

export class Questreq {
    public user: UserModel | undefined;
    public quest: Quest | undefined;
    public questreq: Questreqs | undefined;
  }