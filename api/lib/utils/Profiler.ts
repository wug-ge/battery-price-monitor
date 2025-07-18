
export class Profiler {
  static active = true
  private static lastProfileDate: number;

  static profile(message: string) {
    if (!this.active) {
      return
    }
    if (!this.lastProfileDate) {
      this.lastProfileDate = performance.now()
    }
    console.log(`${message} took ${performance.now() - this.lastProfileDate}`)
    this.lastProfileDate = performance.now()
  }
}