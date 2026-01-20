import { signal } from "@angular/core";
import { User } from "./User";
import Tableheader from "./Tableheader";

export class Datamodel<T> {
    title_ = signal('')
    records_ = signal<T[]>([])
    headers_ = signal<Tableheader[]>([])
    searchByItems_ = signal<string[]>([])
    filterBy_ = signal<string>('')
    filterByItems_ = signal<string[]>([])
}