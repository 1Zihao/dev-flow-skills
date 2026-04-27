#!/usr/bin/env node

process.argv.splice(2, 0, 'update');
await import('../bin/dev-flow.mjs');
