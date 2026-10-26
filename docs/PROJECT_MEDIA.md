# Portfolio project media

These previews accompany the seven geometric-vision and navigation case studies. Scientific visualizations use repository outputs or executed source functions; they do not invent model predictions or flight recordings. Each case study captions the kind of evidence shown.

Generated figure previews use an 800x600 canvas; NeRF uses a 480x480 render. The projects grid preserves each image inside a shared 4:3 display area. No additional build-time tooling is needed to serve these committed assets.

## gap-navigation-planner.gif

**Type:** Planner output visualization.

[Source at the inspected revision](https://github.com/Shakthi-Bala/Navigating_through_unknown-Vizflyt/blob/8203350132d4fb23a5d1d766e9d69633f25b7050/Code/trajectory_generator.py).

Runs the source B-spline generator on waypoints (0,0,0), (1,0.45,0.2), (2,0,0.1), (3,-0.45,0.3), (4,0,0.2). Uses 120 trajectory samples; displays 32 frames at 160 ms each. Not a flight or perception recording.

## deep-vio-trajectories.gif

**Type:** Saved evaluation-figure sequence.

[Source at the inspected revision](https://github.com/Shakthi-Bala/Deep_vio/tree/f87f8a9d15682d946de9bcbf6cf4d3d2048d0c17/Code/Phase%202/visualizations).

Cycles fig14_v2_trajectory_seq_001.png, fig14_v2_trajectory_seq_005.png, and fig14_v2_trajectory_seq_009.png at 1.6 seconds per figure. It does not depict a live camera stream.

## camera-calibration.gif

**Type:** Saved calibration-figure sequence.

[Source at the inspected revision](https://github.com/Shakthi-Bala/Intrinsic_calibration_math_cam/tree/f04f48eb7a337ee7f0cfbd43701b7fe09dfde05e/outputs).

Shows the 042606 corner overlay, then reprojection overlays for views 042606, 042614, and 042629, each for 1.6 seconds. Original images are fitted inside the preview without cropping.

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
