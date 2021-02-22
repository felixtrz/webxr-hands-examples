import * as THREE from "./libs/three.module.js";

function BasicButtonMesh(x, y, z, color, colorOnPress) {
  this.type = "BasicButtonMesh";

  this.geometry = new THREE.BoxGeometry(x, y, z);
  this.material = new THREE.MeshLambertMaterial({ color: color });
  this.pressed = false;
  this.color = color;
  this.colorOnPress = colorOnPress;

  this.onPressAction = null;
  this.onClearAction = null;
  this.whilePressedAction = null;

  THREE.Mesh.call(this, this.geometry, this.material);
}

BasicButtonMesh.prototype = Object.create(THREE.Mesh.prototype);
BasicButtonMesh.prototype.constructor = BasicButtonMesh;

BasicButtonMesh.prototype.getMesh = function () {
  return this.mesh;
};

BasicButtonMesh.prototype.setOnPressAction = function (onPressAction) {
  this.onPressAction = onPressAction;
};

BasicButtonMesh.prototype.setOnClearAction = function (onClearAction) {
  this.onClearAction = onClearAction;
};

BasicButtonMesh.prototype.setWhilePressedAction = function (
  whilePressedAction
) {
  this.whilePressedAction = whilePressedAction;
};

BasicButtonMesh.prototype.onPress = function () {
  if (!this.pressed) {
    this.pressed = true;
    this.material.color.setHex(this.colorOnPress);
    if (this.onPressAction != null) {
      (this.onPressAction)();
    }
  }
};

BasicButtonMesh.prototype.onClear = function () {
  if (this.pressed) {
    this.pressed = false;
    this.material.color.setHex(this.color);
    if (this.onClearAction != null) {
      (this.onClearAction)();
    }
  }
};

BasicButtonMesh.prototype.whilePressed = function () {
  if (this.pressed && this.whilePressedAction != null) {
    (this.whilePressedAction)();
  }
};

BasicButtonMesh.prototype.isPressed = function () {
  return this.pressed;
};

export { BasicButtonMesh };
