import { writable } from 'svelte/store';
import { encode, decode } from './lib/morse';

export const text = writable('');
export const morse = writable('');

text.subscribe(value => morse.set(encode(value)));
morse.subscribe(value => text.set(decode(value)));