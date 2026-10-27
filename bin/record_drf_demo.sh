#!/usr/bin/env bash
# Record the real runnable example with asciinema; arguments are isolated paths.
set -euo pipefail
source_checkout="$1"
demo_project="$2"
export DEMO_DIR="$demo_project"
cd "$source_checkout"
command_line() { printf '\n\033[36m$ %s\033[0m\n' "$1"; }
section() { printf '\033[2J\033[H%s\n\n' "$1"; }
section 'DevResearchFlow | real CLI demonstration'
printf 'Runnable toy ablation. Reviews are synthetic fixtures.\n'
command_line 'drf --version'
drf --version
sleep 1
command_line 'python examples/toy-ablation/build.py "$DEMO_DIR"'
python examples/toy-ablation/build.py "$demo_project"
sleep 3
section 'Reviewed records and retained runs'
command_line 'drf --project "$DEMO_DIR" status'
drf --project "$demo_project" status
sleep 3
command_line 'drf --project "$DEMO_DIR" check'
drf --project "$demo_project" check
sleep 3
cd "$demo_project"
section 'Recompute the toy result'
command_line 'python analysis/check.py'
python analysis/check.py
command_line 'cat runs/RUN-002/metrics.json'
cat runs/RUN-002/metrics.json
sleep 3
command_line 'cat runs/RUN-001/stderr.log'
cat runs/RUN-001/stderr.log
sleep 3
printf '\033[2J\033[H'
command_line 'drf --version'
drf --version
command_line 'drf check'
drf check
command_line 'python analysis/check.py'
python analysis/check.py
sleep 5
