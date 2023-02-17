import { writable } from 'svelte/store';
import type { Client } from 'studentvue';

export const client = writable<Client>();
