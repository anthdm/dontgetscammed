export const emitEvent = (eventName: string) => {
  if (window && (window as any).as_event) {
    ;(window as any).sa_event(eventName)
  }
}
