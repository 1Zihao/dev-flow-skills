#!/usr/bin/env node

process.argv.splice(2, 0, 'install');
await import('../bin/dev-flow.mjs');
