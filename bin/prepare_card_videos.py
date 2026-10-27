#!/usr/bin/env python3
"""Encode card previews from existing recorded assets; preserve documented replay timing.

Requires Pillow and an FFmpeg executable with libx264. Not part of the site build.
"""
import argparse
import subprocess
import tempfile
from pathlib import Path

from PIL import Image

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--ffmpeg', type=Path, required=True)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
out = root / 'assets/video/previews'
out.mkdir(parents=True, exist_ok=True)


def encode(source, target):
    subprocess.run([
        str(args.ffmpeg), '-y', *source, '-an', '-vf',
        'fps=15,scale=min(720\\,iw):-2,pad=ceil(iw/2)*2:ceil(ih/2)*2',
        '-c:v', 'libx264', '-preset', 'slow', '-crf', '25',
        '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(target),
    ], check=True, capture_output=True)
    print(target.relative_to(root), target.stat().st_size)


for slug in ['stereo-vio', 'occupancy-world-model', 'imitation-learning', 'deep-vio']:
    with tempfile.TemporaryDirectory(prefix='portfolio-card-') as directory:
        directory = Path(directory)
        entries = []
        with Image.open(root / f'assets/projects/previews/{slug}.webp') as image:
            for index in range(image.n_frames):
                image.seek(index)
                image.convert('RGB').save(directory / f'{index:04d}.png')
                # The occupancy source has zero-delay frames: use a readable visual replay rate.
                duration = 300 if slug == 'occupancy-world-model' else (image.info.get('duration') or 100)
                entries += [f"file '{index:04d}.png'", f"duration {duration / 1000}"]
            entries.append(f"file '{image.n_frames - 1:04d}.png'")
        manifest = directory / 'frames.txt'
        manifest.write_text('\n'.join(entries) + '\n')
        encode(['-f', 'concat', '-safe', '0', '-i', str(manifest)], out / f'{slug}.mp4')

for slug, source in [('gap-navigation', 'gap-perception-recording'), ('devresearchflow', 'devresearchflow-cli')]:
    encode(['-i', str(root / f'assets/video/{source}.mp4')], out / f'{slug}.mp4')
