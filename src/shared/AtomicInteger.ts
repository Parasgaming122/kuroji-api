export class AtomicInteger {
  private view: Int32Array;

  constructor(initial = 0) {
    const buffer = new SharedArrayBuffer(4);
    this.view = new Int32Array(buffer);
    Atomics.store(this.view, 0, initial);
  }

  get() {
    return Atomics.load(this.view, 0);
  }

  set(val: number) {
    Atomics.store(this.view, 0, val);
  }

  incrementAndGet() {
    return Atomics.add(this.view, 0, 1) + 1;
  }

  getAndIncrement() {
    return Atomics.add(this.view, 0, 1);
  }

  // etc...
}
