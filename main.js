var THREE = require('three'),
    World = require('three-world'),
    OBJLoader = require('./objloader'),
    OBJMTLLoader = require('./objmtlloader'),
    VRControls = require('./vr-controls'),
    VREffect = require('./vr-effect'),
    VideoTexture = require('./video-texture.js'),
    Screenfull = require('screenfull')

    var overlay = document.getElementById('startoverlay')
    overlay.textContent = 'Tap to start'
    overlay.addEventListener('click', function() {
      if(Screenfull.enabled) Screenfull.request()

      screen.lockOrientationUniversal = screen.lockOrientation || screen.mozLockOrientation || screen.msLockOrientation

      if (screen.lockOrientationUniversal) {
        screen.lockOrientationUniversal('landscape')
      } else if(screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').then(function() {
        }, function() { console.log('no lock') })
      }
      this.parentNode.removeChild(this)

      start()
    })

function start() {
  World.init({camDistance: 0, farPlane: 3500, renderCallback: function() {
    texture.update()
    controls.update()
    //vrRenderer.render(World.getScene(), World.getCamera())
    //return false
  }})
  World.add(new THREE.AmbientLight(0xffffff))

  // Video
  var video = document.querySelector("video")
  var texture = new VideoTexture(video)
  video.play()

  // Sphere
  var sphere = new THREE.Mesh(new THREE.SphereGeometry(500, 32, 32), new THREE.MeshBasicMaterial({
    side: THREE.BackSide,
    map: texture.texture
  }))
  World.add(sphere);

  // VR
  controls = new VRControls(World.getCamera())
  vrRenderer = new VREffect(World.getRenderer())

  World.start()
}
