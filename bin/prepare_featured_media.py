#!/usr/bin/env python3
"""Prepare faithful cover crops and replay assets from inspected source outputs.

No inference is run. Required input provenance is documented in docs/PROJECT_MEDIA.md.
"""
import argparse
import json
import re
import subprocess
from pathlib import Path
from PIL import Image

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--deep-figure', type=Path, required=True)
parser.add_argument('--imitation-frame', type=Path, required=True)
parser.add_argument('--cli-gif', type=Path, required=True)
parser.add_argument('--cli-cover', type=Path, required=True)
parser.add_argument('--gap-frames', type=Path, required=True)
parser.add_argument('--ffmpeg', type=Path, required=True)
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
projects = root / 'assets/projects'
covers = projects / 'covers'
covers.mkdir(exist_ok=True)

def still(source, target, frame=0, crop=None):
    with Image.open(source) as image:
        image.seek(frame)  # Pillow composites GIF delta frames before cropping.
        image = image.convert('RGB')
        if crop:
            image = image.crop(crop)
        image.thumbnail((960, 960))
        image.save(covers / f'{target}.webp', quality=92)
        print(target, image.size)

still(projects / 'stereo-vio-demo.gif', 'stereo-vio', 8, (8, 84, 412, 324))
still(projects / 'occupancy-forecast.gif', 'occupancy-world-model', 8, (1132, 50, 1692, 360))
still(args.imitation_frame, 'imitation-learning', crop=(0, 35, 640, 480))
still(args.deep_figure, 'deep-vio', crop=(1165, 60, 2025, 675))
still(args.gap_frames / 'gap_detector_00500.png', 'gap-navigation')
still(args.cli_cover, 'devresearchflow')

# Keep hover/play previews focused on the same evidence as the covers.
previews = projects / 'previews'
previews.mkdir(exist_ok=True)
for source, target, crop in [
    ('stereo-vio-demo.gif', 'stereo-vio', (8, 84, 412, 324)),
    ('occupancy-forecast.gif', 'occupancy-world-model', (1132, 50, 1692, 360)),
    ('imitation-ur5e.gif', 'imitation-learning', (0, 24, 456, 343)),
    ('deep-vio-trajectories.gif', 'deep-vio', (440, 105, 712, 304)),
]:
    focused_frames, focused_durations = [], []
    with Image.open(projects / source) as recording:
        for index in range(recording.n_frames):
            recording.seek(index)
            focused_frames.append(recording.convert('RGB').crop(crop))
            focused_durations.append(recording.info.get('duration', 100))
    focused_frames[0].save(previews / f'{target}.webp', save_all=True,
                          append_images=focused_frames[1:], duration=focused_durations,
                          loop=0, quality=88)

frames = []
for index in range(400, 600, 4):
    with Image.open(args.gap_frames / f'gap_detector_{index:05d}.png') as image:
        frames.append(image.convert('RGB'))
frames[0].save(projects / 'gap-perception-recording.webp', save_all=True,
               append_images=frames[1:], duration=400, loop=0, quality=85)
with Image.open(args.cli_gif) as recording:
    frames, durations = [], []
    for index in range(recording.n_frames):
        recording.seek(index)
        frames.append(recording.convert('RGB'))
        durations.append(recording.info.get('duration', 100))
frames[0].save(projects / 'devresearchflow-cli.webp', save_all=True,
               append_images=frames[1:], duration=durations, loop=0, quality=90)

subprocess.run([str(args.ffmpeg), '-y', '-framerate', '10', '-start_number', '400',
                '-i', str(args.gap_frames / 'gap_detector_%05d.png'), '-frames:v', '200',
                '-c:v', 'libx264', '-preset', 'fast', '-crf', '18', '-pix_fmt', 'yuv420p',
                '-movflags', '+faststart', str(root / 'assets/video/gap-perception-recording.mp4')],
               check=True, capture_output=True)
subprocess.run([str(args.ffmpeg), '-y', '-i', str(args.cli_gif), '-vf',
                'fps=15,pad=ceil(iw/2)*2:ceil(ih/2)*2', '-c:v', 'libx264',
                '-preset', 'fast', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
                str(root / 'assets/video/devresearchflow-cli.mp4')], check=True, capture_output=True)

cast = root / 'assets/demos/devresearchflow-cli.cast'
ansi = re.compile(r'\x1b\[[0-?]*[ -/]*[@-~]')
lines = cast.read_text().splitlines()
text = ''.join(json.loads(line)[2] for line in lines[1:] if json.loads(line)[1] == 'o')
cast.with_suffix('.txt').write_text(ansi.sub('', text).replace('\r\n', '\n'))
