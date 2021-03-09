import { Component } from "./EntityComponentSystem.js";

class PointerDragComponent extends Component {
  constructor(gameObject, pointers) {
    super(gameObject);
    this.pointers = pointers;
    this.parent = null;
    this.draggingPointer = null;
    this.dragging = false;
    this.hovered = false;
  }

  update() {
    let pressedThisFrame = false;
    this.hovered = false;
    for (let pointer of this.pointers) {
      if (pointer) {
        let intersections = pointer.intersectObject(this.gameObject.transform);
        if (intersections && intersections.length > 0) {
          this.hovered = true;
          if (pointer.isPinched()) {
            pressedThisFrame = true;
            this.draggingPointer = pointer;
            break;
          }
        }
      }
    }
    if (pressedThisFrame) {
      if (!this.dragging) {
        this.parent = this.gameObject.transform.parent;
        this.draggingPointer.children[0].attach(this.gameObject.transform);
        this.dragging = true;
      }
    } else {
      if (this.dragging) {
        this.parent.attach(this.gameObject.transform);
        this.dragging = false;
      }
    }
    if (this.hovered) {
      this.gameObject.transform.scale.set(1.1, 1.1, 1.1);
    } else {
      this.gameObject.transform.scale.set(1, 1, 1);
    }
  }
}

export { PointerDragComponent };
