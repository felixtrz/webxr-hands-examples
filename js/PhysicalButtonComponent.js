import { Component } from "./EntityComponentSystem.js";

class PhysicalButtonComponent extends Component {
  constructor(
    gameObject,
    hands,
    onPressAction = null,
    onClearAction = null,
    whilePressedAction = null
  ) {
    super(gameObject);
    this.hands = hands;
    this.onPressAction = onPressAction;
    this.onClearAction = onClearAction;
    this.whilePressedAction = whilePressedAction;
    this.pressed = false;
    this.inRecovery = false;
    this.restingY = this.gameObject.transform.position.y;
  }

  update() {
    let pressedThisFrame = false;
    let pressingPosition = null;
    for (let hand of this.hands) {
      if (hand && hand.intersectBoxObject(this.gameObject.transform)) {
        pressedThisFrame = true;
        pressingPosition = hand.getPointerPosition();
      }
    }
    pressedThisFrame &= !this.inRecovery;
    if (pressedThisFrame) {
      if (this.whilePressedAction) this.whilePressedAction();
      if (!this.pressed) {
        if (this.onPressAction) this.onPressAction();
        this.pressed = true;
      }
    } else {
      if (this.pressed) {
        if (this.onClearAction) this.onClearAction();
        this.pressed = false;
      }
    }
    if (pressedThisFrame) {
      let pressingDistance =
        0.05 - this.gameObject.transform.worldToLocal(pressingPosition).y;
      if (pressingDistance > 0) {
        this.gameObject.transform.position.y -= pressingDistance;
      }
      if (this.gameObject.transform.position.y < this.restingY - 0.02) {
        this.gameObject.transform.position.y = this.restingY - 0.02;
      }
    } else {
      if (this.gameObject.transform.position.y < this.restingY) {
        this.gameObject.transform.position.y += 0.005;
        this.inRecovery = true;
      } else {
        this.gameObject.transform.position.y = this.restingY;
        this.inRecovery = false;
      }
    }
  }
}

export { PhysicalButtonComponent };
