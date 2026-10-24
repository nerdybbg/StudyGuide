@echo off
title StudyBridge (Powered by Hussain AI ^& Built on FlowPlan Architecture)
cd /d "%~dp0"
echo Starting StudyBridge (Hussain AI Edition) on http://localhost:8080 ...
if exist "C:\Users\ETPB\Documents\antigravity\flowplan\runtime\node.exe" (
  start http://localhost:8080
  "C:\Users\ETPB\Documents\antigravity\flowplan\runtime\node.exe" "%~dp0server.js"
) else (
  start http://localhost:8080
  node "%~dp0server.js"
)
pause
