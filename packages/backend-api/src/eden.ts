import { edenTreaty } from '@elysiajs/eden'
import type { App } from 'backend'

export const api = edenTreaty<App>("https://8080-dev.jojit.in")
