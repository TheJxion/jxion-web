#!/bin/bash
# Cleanup script to kill all dev servers and free up ports

echo "🔍 Finding and killing dev servers..."

# Kill processes on common dev ports
PORTS="3000 3001 3002 3003 3004 3005 3006 3007 5173 5174 5175 5176 5177 5178 8080 4200 5000"

for port in $PORTS; do
  PID=$(lsof -ti:$port 2>/dev/null)
  if [ ! -z "$PID" ]; then
    echo "  Killing process on port $port (PID: $PID)"
    kill -9 $PID 2>/dev/null
  fi
done

# Kill vite processes
pkill -f "vite" 2>/dev/null && echo "  Killed vite processes"

# Kill svelte-kit processes
pkill -f "svelte-kit" 2>/dev/null && echo "  Killed svelte-kit processes"

# Kill nx serve processes
pkill -f "nx serve" 2>/dev/null && echo "  Killed nx serve processes"

# Kill npm run dev processes (but be careful)
pkill -f "npm run dev" 2>/dev/null && echo "  Killed npm run dev processes"

echo "✅ Cleanup complete!"
echo ""
echo "📊 Current port usage:"
lsof -i -P -n | grep LISTEN | grep -E ":(300[0-9]|517[0-9]|8080)" | head -10 || echo "  No dev servers running"

