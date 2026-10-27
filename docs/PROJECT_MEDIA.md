# Portfolio project media

These previews accompany the geometric-vision, navigation, synthetic-data, and language-model case studies. Scientific visualizations use repository outputs or executed source functions; they do not invent model predictions or flight recordings. Each case study captions the kind of evidence shown.

Most geometric-vision previews use an 800x600 canvas; NeRF uses a 480x480 render. Calibration, Blender, and Versifier previews use a 1200x900 canvas. The projects grid preserves each image inside a shared 16:10 display area. No additional build-time tooling is needed to serve these committed assets.

## gap-navigation-planner.gif

**Type:** Planner output visualization.

[Source at the inspected revision](https://github.com/Shakthi-Bala/Navigating_through_unknown-Vizflyt/blob/8203350132d4fb23a5d1d766e9d69633f25b7050/Code/trajectory_generator.py).

Runs the source B-spline generator on waypoints (0,0,0), (1,0.45,0.2), (2,0,0.1), (3,-0.45,0.3), (4,0,0.2). Uses 120 trajectory samples; displays 32 frames at 160 ms each. Not a flight or perception recording.

## deep-vio-trajectories.gif

**Type:** Saved evaluation-figure sequence.

[Source at the inspected revision](https://github.com/Shakthi-Bala/Deep_vio/tree/f87f8a9d15682d946de9bcbf6cf4d3d2048d0c17/Code/Phase%202/visualizations).

Cycles fig14_v2_trajectory_seq_001.png, fig14_v2_trajectory_seq_005.png, and fig14_v2_trajectory_seq_009.png at 1.6 seconds per figure. It does not depict a live camera stream.

## camera-calibration.gif and camera-calibration-detail.png

**Type:** Executed calibration with scientific overlays and residual plots.

[Source at the inspected revision](https://github.com/Shakthi-Bala/Intrinsic_calibration_math_cam/tree/f04f48eb7a337ee7f0cfbd43701b7fe09dfde05e).

Executes `Code/Wrapper.py` on all 13 `Calibration_Imgs/*.jpg` images, changing only the three absolute input/output directory strings for the local checkout. All 13 images have detected corners. Overall RMS reprojection error is 2.4196855325 pixels. There is no nonlinear refinement or change to the estimator.

Cycles sorted image indices 0, 4, and 10 (views 042606, 042614, and 042629) for 2.2 seconds each. Each frame crops around the measured checkerboard with a 16% margin and overlays cyan measured corners and pink projected points. The neighboring scatter plot displays projected-minus-measured residuals in pixels with equal axis scaling and image-oriented vertical coordinates. The PNG preserves the first frame for static inspection.

`bin/render_portfolio_previews.py` executes the source estimator, captures its log and numerical arrays, and renders the figures. Place the inspected calibration checkout at `/path/to/portfolio-sources/calibration` and the Blender checkout at `/path/to/portfolio-sources/blender`, then run:

```bash
python bin/render_portfolio_previews.py /path/to/portfolio-sources
```

Requires NumPy, OpenCV, Matplotlib, and Pillow. The calibration run redirects its image outputs to a temporary directory and records `calibration-data.npz` and `calibration-run.log` in the supplied source directory. This is a fresh run on the supplied calibration views, not an independent test dataset.

## nerf-lego.gif

**Type:** Recorded render, optimized for the web.

[Source at the inspected revision](https://github.com/Shakthi-Bala/NERF/blob/fee455d2e27a32ff9c910ced9cc08ef49b954e58/Phase2/lego.gif).

Resizes the original 800x800 GIF to 480x480, retains every second frame, and combines the corresponding frame delays. Uses a 192-color palette and retains the original 6.66-second total duration. No generated views are added.

## classical-sfm.gif

**Type:** Saved reprojection-figure sequence.

[Source at the inspected revision](https://github.com/Shakthi-Bala/Structure_from_motion_classical/tree/d4507801dbdd31afa08f42b401f15b550037e008/Phase1/outputs/reprojection).

Cycles 01_linear_triangulation_cam1.png, 03_nonlinear_triangulation_cam1.png, 07_after_ba_cam1.png, and 08_after_ba_cam2.png at 1.6 seconds each. The unstable nonlinear intermediate is explicitly labeled and retained.

## deep-homography-pairs.gif

**Type:** Executed training-pair generator.

[Source at the inspected revision](https://github.com/Shakthi-Bala/Deep-Homography/blob/4f34d872ced09d3c1f54ee675dadad199be980ab/Phase2/Code/Wrapper.py).

Executes HomographyDataset.get_random_crop_and_pertube without importing the training stack. Uses NumPy seed 11 and 12 samples at 650 ms each. The input is Traditional_panaroma/YourDirectoryID_p1/Phase1/Data/Train/Set1/1.jpg. Offsets are known training labels, not neural-network predictions.

## classical-panorama.gif

**Type:** Saved pipeline-figure sequence.

[Source at the inspected revision](https://github.com/Shakthi-Bala/Traditional_panaroma/tree/13d8846aaf9041de0b2411ad11d13efa64b26fc5/YourDirectoryID_p1/Phase1).

Shows Data/Train/Set1/1.jpg, report_outputs/corner_detection/corners_1.jpg, report_outputs/anms/anms_1.jpg, report_outputs/ransac/ransac_matches_0_1.png, and report_outputs/panaroma/set1_train.png, each for 1.6 seconds. These are selected saved outputs, not a newly executed complete stitching run.

## blender-dataset.gif

**Type:** Saved synthetic renders, masks, and projected annotations.

[Source at the inspected revision](https://github.com/Shakthi-Bala/blender_dataset_generator/tree/2b756a20cd24e8f16419a69c382794aef2edced0/Blender_dataset/images).

Cycles `c1_00001`, `c2_00001`, `c3_00001`, `c1_00003`, `c2_00003`, and `c3_00003`, with 2.2 seconds per frame. The RGB panel overlays saved JSON plane-corner coordinates; y is converted with `height - 1 - y` from the generator's bottom-origin convention. The adjacent panel shows the corresponding saved mask unchanged. Mask rendering omits occluders, and the clamped corner labels have no visibility flag. These are source outputs, not inferred segmentation results.

Render with `python bin/render_portfolio_previews.py /path/to/portfolio-sources`, with the source checkouts described above. Requires NumPy, OpenCV, Matplotlib, and Pillow; none are added to the website build.

## versifier.svg

**Type:** Native SVG architecture illustration with a documented sample excerpt.

[Source at the inspected revision](https://github.com/Shakthi-Bala/Shakesphere_poem_generator/tree/9ab1f4b181337a47d28fdc25c51d194215fead86/Code).

Shows the LSTM and GPT-2 paths implemented in `model.py`, `fine_tune.py`, `generate.py`, and `main.py`. The four displayed lines are transcribed from `section_output()` in `report.py`, which labels them as a GPT-2 sample at temperature 0.8. They are not a newly executed model output. No checkpoint or training corpus is included in the inspected public checkout.

## Robotics preview reproduction

`bin/render_robotics_previews.py` renders the following scientific figures and recorded-video previews with OpenCV, Matplotlib, NumPy, and Pillow:

```bash
python bin/render_robotics_previews.py /path/to/portfolio-sources
```

Place the inspected source checkouts in that directory under their original GitHub repository names. The script reads saved artifacts; it does not run robot hardware, controllers, segmentation inference, or a new simulation. All animations loop. The native SVG architecture illustrations below can be edited directly.

## cbf-drone.gif

**Type:** Saved simulation-figure sequence.

[Source at the inspected revision](https://github.com/Shakthi-Bala/CBF_for_full_drone_dynamics/tree/d8f9752023047048af9578bc7de1dc33d1418a98/figures/with_cbf/2_cylinder).

Cycles `cbf_2cylinder_top_down.png` and `cbf_2cylinder_dist_to_obs.png`, 2.4 seconds each, on a 1200x900 canvas. Original figures are fitted without cropping; axes, legends, and results remain unchanged. These are the repository's saved CBF-labeled scenario outputs, not a new simulation or a claim of a full-dynamics safety guarantee. The active default controller file is the baseline; the CBF integration is in `scripts/backup_nonlinear_controller.py`.

## aerial-window-navigation.webp

**Type:** Sampled rendered-navigation recording.

[Source at the inspected revision](https://github.com/Shakthi-Bala/Final_project_Aerial_Robotics_RBE595/blob/05fc96f3c62a2839f375984e783c2c2b16fbee54/video/drone_3windows.mp4).

Reads the 1,153-frame, 30 fps source recording at every 15th frame (77 retained frames), resizes from 2752x2064 to 720x540 without cropping, and encodes animated WebP at quality 72 with 120 ms per frame. The WebP encoder merges one adjacent duplicate, yielding 76 encoded frames while preserving the 9.24-second playback duration. Playback is approximately 4.2 times source-video speed. It shows saved camera views of a Gaussian-splat scene; it is not a physical flight recording or a newly run navigation benchmark.

## vizflyt-perception.webp and vizflyt-perception-mask-depth.mp4

**Type:** Owner-supplied synchronized RGB, depth, and window-mask recording.

Source: `video_with mask_and depth.mp4`, supplied by the site owner. A browser-compatible H.264 copy is committed at `assets/video/vizflyt-perception-mask-depth.mp4` and embedded with native playback controls on the project page. The supplied MPEG-4 Part 2 video is transcoded with libx264 (`-preset fast -crf 21 -pix_fmt yuv420p -movflags +faststart`), preserving resolution, frame count, frame rate, and panel layout. The full recording is 1920x480, 431 frames at 30 fps (approximately 14.37 seconds), with three adjacent 640x480 panels: RGB, depth, and window-mask output.

`window_perception()` in `bin/render_robotics_previews.py` reads the committed video directly, so the original local filename and the external Vizflyt recording are no longer needed to reproduce this preview. It samples every sixth frame (72 retained samples) with 200 ms per sample, preserving approximately source-video speed. The RGB panel appears larger on the left, with depth and mask stacked on the right, on a 960x720 canvas. Each panel is fitted without cropping. The WebP uses quality 72; the encoder may merge adjacent identical frames while preserving timing. No new inference, depth estimation, or mask computation is performed.

The full MP4 retains the source's original horizontal layout and timing. It replaces the earlier RGB-only preview from `Code/log/drone_state_machine.mp4`. The inspected navigation path still uses centroid corrections and per-window offsets; this recording does not add a measured PnP accuracy result.

## orientation-filters.gif

**Type:** Reflowed scientific orientation-comparison recording.

[Source at the inspected revision](https://github.com/Shakthi-Bala/Pose_correction_with_filters/blob/a9cdb78b9519d7002ff41ed4e9c407401eb1d1b9/Phase1/Videos/orientation_comparison_6_panel_5.mp4).

Reads the 120-frame, 20 fps recording at every fourth frame, retaining 30 frames at 200 ms each. Each original 2400x480 scientific frame is divided into its six equal 400x480 panels, then arranged into a three-column, two-row layout on a 960x720 canvas. Original panel titles, timestamps, and orientation visualizations are retained. The source filename labels sequence 5; this does not independently verify data provenance or establish a new error metric. Columns show gyro, accelerometer, complementary filter, Madgwick, UKF, and Vicon.

## rgmc-simsort.svg

**Type:** Native SVG illustration of a documented design.

[Source at the inspected revision](https://github.com/Shakthi-Bala/RGMC_Simsort_2025/blob/9c700495deb61d0eab2962ca6e2044594afa2328/README.md).

Summarizes seven lookup views, perception/deprojection/PCA, five workspace-region strategies, and class-based placement. The inspected Git checkout contains only the README. The illustration is not a screenshot, execution trace, or verified implementation result; the README's external demo/files folder was not used to create this asset.

## ur16e-vision-gripper.svg

**Type:** Native SVG source-code architecture illustration.

[Source at the inspected revision](https://github.com/Shakthi-Bala/UR_robot_integration_with_vision_and_gripper-using-movit/tree/f52f1d92d8181ac91a6935136e4bb0aaad029862).

Based on `final_pkg/scripts/Try.py`, `final_pkg/scripts/mpick_client.py`, the alternative object-location clients, and `final_pkg/launch/sim_complete.launch`. Distinguishes external object-location interfaces from fixed demonstration poses, then shows action goals, MoveIt planning/execution, gripper requests, and staged manipulation. It does not depict a recorded or newly verified hardware run.

## pblite-boundaries.png

**Type:** Saved scientific comparison figure extracted from the project report.

[Source at the inspected revision](https://github.com/Shakthi-Bala/Pblite_boundary_detection/blob/63dbb9f4958a4616ba1bf5051cab065f301ce30c/Report.pdf).

Extracts the second embedded image on PDF page 3: Figure 8, a 1800x4500 comparison of Canny, Sobel, and Pb-lite outputs across ten images. Selects rows 1, 4, and 5 (airplane, butterfly, duck), preserving all three method columns and their existing pixel values. White gutters between the original rows and columns are omitted; no detector is run and no edge contrast is enhanced. The selected panels are fitted on a labeled 1200x900 scientific figure.

Reproduce with `python bin/render_pblite_preview.py /path/to/Pblite_boundary_detection`. The optional script requires PyMuPDF, NumPy, Matplotlib, and Pillow; none are added to the website build. The figure shows qualitative report outputs, not a new precision/recall evaluation. CIFAR-10 results discussed in the case study belong to the repository's separate classification phase.

## stereo-vio-tracking.png

**Type:** Saved diagnostic plot, copied unchanged from the VIO repository.

[Source at the inspected revision](https://github.com/Shakthi-Bala/Classical_vio/blob/5a659caad3694b498a67e6236d9b847d2ab257ce/cpp/results/final/v203_tracking.png).

Used in the engineering note about EuRoC V2_03 stereo-matching dropouts. The plot shows the repository's recorded tracking/exposure diagnostics; no measurements or plot content were changed for the website. It supports the observation that temporal tracks remained available during periods of failed stereo matching.

## Still previews in the project collection

`assets/projects/posters/*.webp` are still frames extracted from the existing animated project previews, with a maximum dimension of 960 pixels. `_data/project_previews.yml` maps project slugs to these posters. The project collection starts with still images; its Play preview buttons load the original animation on request. Only one preview plays at a time, and switching browser tabs stops it. Without JavaScript, the still previews and project links remain available.

## Site presentation

The default dark palette uses jet black `#09090e`, royal amethyst `#7040b5` for primary buttons, and electric cyan `#53e3f5` for links and focus indicators. Lighter amethyst is used for text on dark surfaces. `assets/css/main.scss` mirrors the upstream theme entrypoint and adds the site-only `portfolio-theme` Sass module. Its reviewed override is recorded in `.al-folio-overrides.yml`; compare it when upgrading `al_folio_core`. The theme switch also offers a light palette with amethyst accents and a darker cyan for readable links. Saved light, dark, and system preferences are preserved; new visitors start in dark mode. `_plugins/portfolio_presentation.rb` loads the preference initializer before the upstream theme and fingerprints the local stylesheet sources, including the palette module, so CSS changes receive a fresh cache key.

## Focused featured covers and recordings

The featured cards now use fresh paths under `assets/projects/covers/`. Labels below the images identify recorded output, saved evaluation figures, or synthetic teaching fixtures. The full figures remain available in the case studies. The crop operations below remove surrounding panels or embedded small headings; they do not change measurements, trajectories, contours, or predictions.

`bin/prepare_featured_media.py` creates the covers and focused animated WebP previews. It uses Pillow's composited GIF frames, so GIF delta encoding does not leave transparent patches. The original frame delays are retained for the four existing scientific animations.

| Project               | Cover source and selection                                                                                                                                                                                                                                                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Stereo VIO            | Frame 8 of the existing `stereo-vio-demo.gif`, camera region `(8,84)-(412,324)`. The same region is retained throughout the focused preview.                                                                                                                                                                                                           |
| Occupancy world model | Frame 8 of `occupancy-forecast.gif`, the learned forecast panel `(1132,50)-(1692,360)`. The focused animation keeps the same panel and original delays.                                                                                                                                                                                                |
| Imitation learning    | Frame at 1.1 seconds of [`ur_pusht/media/pusht2d_flow_seed7.mp4`](https://github.com/Shakthi-Bala/imitation_learning_agent/blob/114489af9181f996d7f528d68aadedd801619ca7/ur_pusht/media/pusht2d_flow_seed7.mp4), simulated UR5e region `(0,35)-(640,480)`. The focused preview uses the corresponding existing GIF's robot panel.                      |
| Deep VIO              | Top-down plot `(1165,60)-(2025,675)` of [`fig14_v2_trajectory_seq_001.png`](https://github.com/Shakthi-Bala/Deep_vio/blob/f87f8a9d15682d946de9bcbf6cf4d3d2048d0c17/Code/Phase%202/visualizations/fig14_v2_trajectory_seq_001.png). The focused preview crops the corresponding plot from the existing saved-figure sequence; it is not camera footage. |
| Gap navigation        | Saved detector frame 500 from the RAFT branch, with its existing contour and centroid annotations.                                                                                                                                                                                                                                                     |
| DevResearchFlow       | Final screen of the actual recorded CLI session, rendered with agg at 44 columns and 14 rows for a legible cover.                                                                                                                                                                                                                                      |

### Gap perception recording

Source: [`raft_branch` at `f6eff9e0db7d5eb263017628dbd88ef338340bf8`](https://github.com/Shakthi-Bala/Navigating_through_unknown-Vizflyt/tree/f6eff9e0db7d5eb263017628dbd88ef338340bf8/output/gap_detector). The default branch does not contain these recorded outputs. Frames 400–599 are replayed consecutively at 10 fps in `assets/video/gap-perception-recording.mp4`. The WebP preview keeps every fourth frame for 400 ms each, retaining the same 20-second replay duration.

`Code/raft_image_gap.py` draws low-flow contours and centroids over RAFT flow colors. The site reuses those saved outputs; no inference or new detection is performed. The source frame timing is not established, so the caption explicitly states the chosen replay rate. This is perception-stage output, not an end-to-end flight recording or a measured traversal-success result.

### DevResearchFlow CLI recording

Source: [`DevResearchFlow` at `2740a816fa9af3f44289d8360a088610fc670827`](https://github.com/Shakthi-Bala/DevResearchFlow/tree/2740a816fa9af3f44289d8360a088610fc670827). The runnable toy example was executed in an isolated temporary directory using Python 3.13 and the repository's actual CLI. `bin/record_drf_demo.sh` records example creation, workflow status, record validation, metric recomputation, and the retained failed-run log. Every displayed result comes from those commands.

The trace is committed as `assets/demos/devresearchflow-cli.cast`, with a readable `.txt` transcript. `agg` 1.9.0 renders the cast into GIF frames; the preparation script converts those frames to animated WebP and H.264 MP4. Idle intervals are limited to three seconds. The video is `assets/video/devresearchflow-cli.mp4` and uses native video controls.

The example uses synthetic review fixtures and fictional local commit identities, as its README states. It makes no model or agent calls. Its actual toy metrics are baseline MSE 0 and ablated MSE 7.5; its records retain one failed run and one completed run. The CLI reports 12 records, zero blockers, and zero structural validation errors. These are software-demonstration results, not independent scientific review or generalization evidence.

To reproduce, install the source package and asciinema in an isolated environment, then record the shell script with the source checkout and a new destination directory. Render the cast with agg using DejaVu Sans Mono; see the preparation script's required arguments for the original figures, recording GIFs, saved gap frames, and FFmpeg binary. These tools are only needed to regenerate media; the website serves committed files.

## MP4 previews on Home and Projects

`bin/prepare_card_videos.py --ffmpeg /path/to/ffmpeg` encodes the existing focused WebP replays for Stereo VIO, occupancy forecasting, UR5e imitation learning, and Deep VIO. It preserves nonzero frame delays, uses a documented 300 ms per frame for the occupancy source’s zero-delay sequence, resamples to 15 fps, and uses H.264/yuv420p with fast-start metadata. Gap navigation and DevResearchFlow use smaller encodes of their existing MP4 recordings. The six files total about 2 MB; none contains audio. No new inference, interpolation, or scientific output is introduced. Saved-figure/replay labels remain visible.

`_data/project_previews.yml` points to these assets. On Home (including the hero) and the six featured Projects cards, a mouse hover starts muted looping playback; Play/Pause buttons support touch and keyboard use. Only one preview plays at a time. Playback stops when its card leaves the viewport, the pointer leaves the card, or the tab is hidden. Reduced-motion and data-saving preferences disable hover playback; explicit playback remains available. Video URLs are attached only on demand, so initial page loads fetch still images. Without JavaScript, the stills and project/code links remain usable. Full recordings and native video controls remain in the case studies.

## Supplied RGB gap-navigation recording

Source: user-supplied `/home/sbalamurugan/portfolio/rgb_color_space.mp4` (34.17 s, 2752×2064, 30 fps). The rendered first-person view approaches and passes through an irregular opening; the optical-flow panel is blank initially and displays detections later. Keep the complete sequence, including that initial blank panel. This is one rendered run, not a physical flight or an aggregate success evaluation.

Regenerate with `python bin/prepare_gap_rgb.py /path/to/rgb_color_space.mp4 --ffmpeg /path/to/ffmpeg`. The looping GIF retains the full frame at 480×360 and 6 fps, with 96 colors and no dithering. The full controlled MP4 is 1280×960; the on-demand card MP4 is 720×540. Both use H.264 at 15 fps with no audio and fast-start metadata. The cover is the frame at 24 s, resized to 960×720. Playback speed is unchanged; no crops, generated frames, or overlays are added.

The GIF is used by the project’s case-study Play/Pause preview and the library preview. Home and featured Projects cards use the smaller MP4 from this same recording. The case study also offers the GIF download and a controlled video. Earlier saved optical-flow detections remain linked as supporting evidence.

## DevResearchFlow card presentation

The DevResearchFlow cover is a still of the final frame of `docs/assets/research-workflow.gif` from the inspected repository checkout (revision `2740a816fa9af3f44289d8360a088610fc670827`). The original GIF is copied unchanged to `assets/projects/devresearchflow-repository-workflow.gif` and used by the library’s optional preview and the case-study workflow reference. The cover is exported as `assets/projects/covers/devresearchflow-workflow.webp` at quality 92.

Home and featured Projects cards show the still by default, with Write-up, Code, and Demo links. DevResearchFlow deliberately has no `video` field in preview data, so the terminal recording stays off these cards. Its `demo_anchor` links to the recorded CLI demonstration inside the case study; that recording and its synthetic-fixture caption remain unchanged.

The workflow image on Home and featured Projects cards now plays the repository GIF on mouse hover and restores its still when the pointer leaves the card. A Play/Pause button supports touch and keyboard use. Reduced-motion and data-saving preferences suppress automatic hover playback. The Demo link still opens the terminal recording inside the case study; no CLI video is embedded in these cards.

## Preview cues

The hero and six featured cards have a small decorative “▶ Preview” badge in the top-right corner. It appears only after JavaScript enables playback, fades while the video or workflow GIF is playing, and returns on pause or pointer exit. The badge does not intercept case-study links; the existing labelled Play/Pause buttons remain the touch and keyboard controls. Reduced-motion preferences disable the fade. Videos retain on-demand loading and `preload="none"`.
