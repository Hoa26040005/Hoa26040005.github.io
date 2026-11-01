@echo off
title Huynh Thai Hoa - Creative Developer Portfolio (Port 4500)
echo Starting Huynh Thai Hoa Portfolio Server at http://localhost:4500 ...
start http://localhost:4500
node ".agents/skills/scroll-craft/scripts/serve.mjs" --root . --port 4500

