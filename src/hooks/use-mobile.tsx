import * as React from "react"

const MOBILE_BREAKPOINT = 1024 // Changed to lg breakpoint (1024px) to match header

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      const newIsMobile = window.innerWidth < MOBILE_BREAKPOINT
      console.log("useIsMobile: screen width =", window.innerWidth, "isMobile =", newIsMobile)
      setIsMobile(newIsMobile)
    }
    mql.addEventListener("change", onChange)
    
    // Initial check
    const initialIsMobile = window.innerWidth < MOBILE_BREAKPOINT
    console.log("useIsMobile: initial screen width =", window.innerWidth, "initial isMobile =", initialIsMobile)
    setIsMobile(initialIsMobile)
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
