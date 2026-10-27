#!/usr/bin/env python3
"""Prepare the supplied 34-second RGB/flow recording for the portfolio."""
import argparse
import subprocess
from pathlib import Path

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('source', type=Path)
parser.add_argument('--ffmpeg', type=Path, required=True)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]


def run(*options):
    subprocess.run([str(args.ffmpeg), '-hide_banner', '-loglevel', 'error', '-y', *options], check=True)


run('-i', str(args.source), '-filter_complex',
    'fps=6,scale=480:-1:flags=lanczos,split[a][b];'
    '[a]palettegen=max_colors=96:stats_mode=diff[p];'
    '[b][p]paletteuse=dither=none:diff_mode=rectangle',
    '-loop', '0', str(root / 'assets/projects/gap-navigation-rgb.gif'))
for path, width in [('assets/video/gap-navigation-rgb.mp4', 1280),
                    ('assets/video/previews/gap-navigation-rgb.mp4', 720)]:
    run('-i', str(args.source), '-an', '-vf', f'fps=15,scale={width}:-2',
        '-c:v', 'libx264', '-preset', 'slow', '-crf', '25', '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart', str(root / path))
run('-ss', '24', '-i', str(args.source), '-vf', 'scale=960:-1', '-frames:v', '1',
    '-quality', '90', str(root / 'assets/projects/covers/gap-navigation-rgb.webp'))
