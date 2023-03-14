import { writable } from 'svelte/store';
import type { Client, Gradebook } from 'studentvue';

export const client = writable<Client>();
export const grades = writable<Gradebook | undefined>();
