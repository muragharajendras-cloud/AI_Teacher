import { FaceMesh, Results } from '@mediapipe/face_mesh'

const GAZE_THRESHOLD_FRAMES = 10   // 10s at 1fps
const NOFACE_THRESHOLD_FRAMES = 3  // 3s at 1fps

let gazeCount = 0
let nofaceCount = 0

// A rudimentary computeGazeScore using some landmarks. 
// A real app would use advanced pupil/iris tracking.
// We mock a simple bounding box/centroid check or just random logic for the skeleton.
function computeGazeScore(landmarks: any) {
  // Mock logic: returns 1.0 (looking) or 0.1 (away)
  // In reality: Math to determine head pose (yaw/pitch)
  return 1.0 
}

const faceMesh = new FaceMesh({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`
  }
})

faceMesh.setOptions({
  maxNumFaces: 1,
  refineLandmarks: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
})

faceMesh.onResults((results: Results) => {
  if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
    nofaceCount++
    if (nofaceCount >= NOFACE_THRESHOLD_FRAMES) {
      self.postMessage({ type: 'incident', kind: 'no_face' })
      nofaceCount = 0 // reset after firing to wait for cooldown
    }
    return
  }
  nofaceCount = 0
  
  const score = computeGazeScore(results.multiFaceLandmarks[0])
  if (score < 0.35) {
    gazeCount++
    if (gazeCount >= GAZE_THRESHOLD_FRAMES) {
      self.postMessage({ type: 'incident', kind: 'gaze_away' })
      gazeCount = 0
    }
  } else {
    gazeCount = 0
  }
})

self.onmessage = async ({ data }) => {
  if (data.type === 'process_frame') {
    // data.frame is an ImageBitmap
    await faceMesh.send({ image: data.frame })
  }
}
