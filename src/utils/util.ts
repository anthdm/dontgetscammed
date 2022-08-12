export const emitSaEvent = (eventName: string) => {
  if (window && (window as any).sa_event) {
    ;(window as any).sa_event(eventName)
  }
}
