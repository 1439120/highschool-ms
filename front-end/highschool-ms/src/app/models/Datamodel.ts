import { signal } from "@angular/core";
import { User } from "./User";

export class Datamodel {
    title_ = signal('')
    records_ = signal<User[]>([])
}