"use client"

import {
  AnimatePresence,
  motion,
} from "motion/react"
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import {
  IconBrightnessDown,
  IconBrightnessUp,
  IconCaretDownFilled,
  IconCaretLeftFilled,
  IconCaretRightFilled,
  IconCaretUpFilled,
  IconChevronUp,
  IconCommand,
  IconMicrophone,
  IconMoon,
  IconPlayerSkipForward,
  IconPlayerTrackNext,
  IconPlayerTrackPrev,
  IconSearch,
  IconTable,
  IconVolume,
  IconVolume2,
  IconVolume3,
  IconWorld,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"

type KeyboardContextType = {
  lastPressedKey: string | null
  playSound: (keyCode: string) => void
  pressSequence: number
  pressedKeys: Set<string>
  releaseAll: () => void
  setPressed: (keyCode: string) => void
  setReleased: (keyCode: string) => void
}

type KeyDefinition = {
  children?: React.ReactNode
  code?: string
  className?: string
  contentClassName?: string
  containerClassName?: string
}

type KeyboardProps = {
  className?: string
  enableSound?: boolean
  showPreview?: boolean
}

const keyDisplayLabels: Record<string, string> = {
  AltLeft: "option",
  AltRight: "option",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "up",
  Backquote: "`",
  Backslash: "\\",
  Backspace: "delete",
  BracketLeft: "[",
  BracketRight: "]",
  CapsLock: "caps",
  Comma: ",",
  ControlLeft: "control",
  Enter: "return",
  Equal: "=",
  Escape: "esc",
  Fn: "fn",
  MetaLeft: "command",
  MetaRight: "command",
  Minus: "-",
  Period: ".",
  Quote: "'",
  Semicolon: ";",
  ShiftLeft: "shift",
  ShiftRight: "shift",
  Slash: "/",
  Space: "space",
  Tab: "tab",
}

const soundIndexes: Record<string, string> = {
  AltLeft: "56",
  AltRight: "3613",
  ArrowDown: "80",
  ArrowLeft: "79",
  ArrowRight: "81",
  ArrowUp: "83",
  Backquote: "41",
  Backslash: "43",
  Backspace: "14",
  BracketLeft: "26",
  BracketRight: "27",
  CapsLock: "58",
  Comma: "51",
  ControlLeft: "29",
  Digit0: "11",
  Digit1: "2",
  Digit2: "3",
  Digit3: "4",
  Digit4: "5",
  Digit5: "6",
  Digit6: "7",
  Digit7: "8",
  Digit8: "9",
  Digit9: "10",
  Enter: "28",
  Equal: "13",
  Escape: "1",
  F1: "59",
  F2: "60",
  F3: "61",
  F4: "62",
  F5: "63",
  F6: "64",
  F7: "65",
  F8: "66",
  F9: "67",
  F10: "68",
  F11: "87",
  F12: "88",
  Fn: "83",
  KeyA: "30",
  KeyB: "48",
  KeyC: "46",
  KeyD: "32",
  KeyE: "18",
  KeyF: "33",
  KeyG: "34",
  KeyH: "35",
  KeyI: "23",
  KeyJ: "36",
  KeyK: "37",
  KeyL: "38",
  KeyM: "50",
  KeyN: "49",
  KeyO: "24",
  KeyP: "25",
  KeyQ: "16",
  KeyR: "19",
  KeyS: "31",
  KeyT: "20",
  KeyU: "22",
  KeyV: "47",
  KeyW: "17",
  KeyX: "45",
  KeyY: "21",
  KeyZ: "44",
  MetaLeft: "3675",
  MetaRight: "3675",
  Minus: "12",
  Period: "52",
  Quote: "40",
  Semicolon: "39",
  ShiftLeft: "42",
  ShiftRight: "54",
  Slash: "53",
  Space: "57",
  Tab: "15",
}

type SoundConfig = {
  defines: Record<string, [number, number]>
  sound: string
}

const KeyboardContext = createContext<KeyboardContextType | null>(null)

function useKeyboard() {
  const context = useContext(KeyboardContext)

  if (!context) {
    throw new Error("useKeyboard must be used within KeyboardProvider")
  }

  return context
}

function getKeyDisplayLabel(keyCode: string): string {
  if (keyDisplayLabels[keyCode]) {
    return keyDisplayLabels[keyCode]
  }

  if (keyCode.startsWith("Key")) {
    return keyCode.slice(3)
  }

  if (keyCode.startsWith("Digit")) {
    return keyCode.slice(5)
  }

  return keyCode
}

function KeyboardProvider({
  children,
  containerRef,
  enableSound,
}: {
  children: React.ReactNode
  containerRef: React.RefObject<HTMLDivElement | null>
  enableSound: boolean
}) {
  const audioBufferRef = useRef<AudioBuffer | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const soundConfigRef = useRef<SoundConfig | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [lastPressedKey, setLastPressedKey] = useState<string | null>(null)
  const [pressSequence, setPressSequence] = useState(0)
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())
  const [soundLoaded, setSoundLoaded] = useState(false)

  useEffect(() => {
    if (!enableSound) {
      return
    }

    let isMounted = true

    async function loadSound() {
      try {
        const AudioContextConstructor =
          window.AudioContext ||
          (
            window as typeof window & {
              webkitAudioContext?: typeof AudioContext
            }
          ).webkitAudioContext

        if (!AudioContextConstructor) {
          return
        }

        const [configResponse, soundResponse] = await Promise.all([
          fetch("/sounds/config.json"),
          fetch("/sounds/sound.ogg"),
        ])

        if (!configResponse.ok || !soundResponse.ok) {
          return
        }

        const config = (await configResponse.json()) as SoundConfig
        const arrayBuffer = await soundResponse.arrayBuffer()
        const audioContext = new AudioContextConstructor()
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)

        if (!isMounted) {
          void audioContext.close()
          return
        }

        soundConfigRef.current = config
        audioContextRef.current = audioContext
        audioBufferRef.current = audioBuffer
        setSoundLoaded(true)
      } catch {
        setSoundLoaded(false)
      }
    }

    void loadSound()

    return () => {
      isMounted = false
      void audioContextRef.current?.close()
      audioContextRef.current = null
      audioBufferRef.current = null
      soundConfigRef.current = null
    }
  }, [enableSound])

  const playSound = useCallback(
    (keyCode: string) => {
      if (!enableSound || !soundLoaded) {
        return
      }

      const audioContext = audioContextRef.current
      const audioBuffer = audioBufferRef.current
      const soundConfig = soundConfigRef.current
      const soundIndex = soundIndexes[keyCode]
      const soundDefinition = soundIndex ? soundConfig?.defines[soundIndex] : null

      if (!audioContext || !audioBuffer || !soundDefinition) {
        return
      }

      void (async () => {
        if (audioContext.state === "suspended") {
          await audioContext.resume()
        }

        const [startMs, durationMs] = soundDefinition
        const source = audioContext.createBufferSource()
        const gain = audioContext.createGain()

        gain.gain.value = 0.52
        source.buffer = audioBuffer
        source.connect(gain)
        gain.connect(audioContext.destination)
        source.start(0, startMs / 1000, Math.min(durationMs / 1000, 0.16))
      })()
    },
    [enableSound, soundLoaded]
  )

  const setPressed = useCallback((keyCode: string) => {
    setPressedKeys((currentKeys) => new Set(currentKeys).add(keyCode))
    setLastPressedKey(keyCode)
    setPressSequence((currentSequence) => currentSequence + 1)
    playSound(keyCode)
  }, [playSound])

  const setReleased = useCallback((keyCode: string) => {
    setPressedKeys((currentKeys) => {
      const nextKeys = new Set(currentKeys)
      nextKeys.delete(keyCode)
      return nextKeys
    })
  }, [])

  const releaseAll = useCallback(() => {
    setPressedKeys(new Set())
  }, [])

  useEffect(() => {
    const element = containerRef.current

    if (!element) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [containerRef])

  useEffect(() => {
    if (!isVisible) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.repeat) {
        return
      }

      setPressed(event.code)
    }

    function handleKeyUp(event: KeyboardEvent) {
      setReleased(event.code)
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    window.addEventListener("blur", releaseAll)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      window.removeEventListener("blur", releaseAll)
    }
  }, [isVisible, releaseAll, setPressed, setReleased])

  return (
    <KeyboardContext.Provider
      value={{
        lastPressedKey,
        playSound,
        pressSequence,
        pressedKeys,
        releaseAll,
        setPressed,
        setReleased,
      }}
    >
      {children}
    </KeyboardContext.Provider>
  )
}

function KeystrokePreview() {
  const { lastPressedKey, pressSequence, pressedKeys } = useKeyboard()
  const shouldHideKey =
    !lastPressedKey ||
    lastPressedKey === "Space" ||
    lastPressedKey === "ShiftLeft" ||
    lastPressedKey === "ShiftRight"
  const displayKey = shouldHideKey ? null : getKeyDisplayLabel(lastPressedKey)

  return (
    <div className="relative flex h-14 w-full items-center justify-center">
      <AnimatePresence mode="popLayout">
        {displayKey ? (
          <motion.div
            key={`${pressSequence}-${lastPressedKey}`}
            layout
            initial={{ opacity: 0, scale: 0.7, y: 6 }}
            animate={{
              opacity: 1,
              scale: pressedKeys.size > 0 ? 0.96 : 1,
              y: 0,
            }}
            exit={{ opacity: 0, scale: 0.82, y: -6 }}
            transition={{
              damping: 30,
              mass: 0.5,
              stiffness: 500,
              type: "spring",
            }}
            className="absolute rounded-xl px-4 py-2 font-mono text-2xl font-black text-foreground/70"
          >
            <motion.span
              initial={{ filter: "blur(10px)", opacity: 0, scale: 1.18 }}
              animate={{ filter: "blur(0px)", opacity: 1, scale: 1 }}
              transition={{ duration: 0.08 }}
            >
              {displayKey}
            </motion.span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

export function Keyboard({
  className,
  enableSound = false,
  showPreview = false,
}: KeyboardProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <KeyboardProvider enableSound={enableSound} containerRef={containerRef}>
      <div
        ref={containerRef}
        className={cn(
          "mx-auto w-fit [zoom:0.92] lg:[zoom:1.32] xl:[zoom:1.48] 2xl:[zoom:1.62]",
          className
        )}
      >
        {showPreview ? <KeystrokePreview /> : null}
        <Keypad />
      </div>
    </KeyboardProvider>
  )
}

function Keypad() {
  return (
    <div className="h-full w-fit rounded-xl bg-neutral-200 p-1 shadow-sm ring-1 shadow-black/5 ring-black/5">
      <Row>
        <Key
          code="Escape"
          containerClassName="rounded-tl-xl"
          className="w-10 rounded-tl-lg"
          contentClassName="items-start justify-end pb-[2px] pl-[4px]"
        >
          <span>esc</span>
        </Key>
        <Key code="F1">
          <IconBrightnessDown className="size-[6px]" />
          <span className="mt-1">F1</span>
        </Key>
        <Key code="F2">
          <IconBrightnessUp className="size-[6px]" />
          <span className="mt-1">F2</span>
        </Key>
        <Key code="F3">
          <IconTable className="size-[6px]" />
          <span className="mt-1">F3</span>
        </Key>
        <Key code="F4">
          <IconSearch className="size-[6px]" />
          <span className="mt-1">F4</span>
        </Key>
        <Key code="F5">
          <IconMicrophone className="size-[6px]" />
          <span className="mt-1">F5</span>
        </Key>
        <Key code="F6">
          <IconMoon className="size-[6px]" />
          <span className="mt-1">F6</span>
        </Key>
        <Key code="F7">
          <IconPlayerTrackPrev className="size-[6px]" />
          <span className="mt-1">F7</span>
        </Key>
        <Key code="F8">
          <IconPlayerSkipForward className="size-[6px]" />
          <span className="mt-1">F8</span>
        </Key>
        <Key code="F9">
          <IconPlayerTrackNext className="size-[6px]" />
          <span className="mt-1">F9</span>
        </Key>
        <Key code="F10">
          <IconVolume3 className="size-[6px]" />
          <span className="mt-1">F10</span>
        </Key>
        <Key code="F11">
          <IconVolume2 className="size-[6px]" />
          <span className="mt-1">F11</span>
        </Key>
        <Key code="F12">
          <IconVolume className="size-[6px]" />
          <span className="mt-1">F12</span>
        </Key>
        <Key containerClassName="rounded-tr-xl" className="rounded-tr-lg">
          <div className="size-4 rounded-full bg-gradient-to-b from-neutral-300 via-neutral-200 to-neutral-300 p-px">
            <div className="size-full rounded-full bg-neutral-100" />
          </div>
        </Key>
      </Row>

      <Row>
        <Key code="Backquote">
          <DoubleLegend top="~" bottom="`" />
        </Key>
        <Key code="Digit1">
          <DoubleLegend top="!" bottom="1" />
        </Key>
        <Key code="Digit2">
          <DoubleLegend top="@" bottom="2" />
        </Key>
        <Key code="Digit3">
          <DoubleLegend top="#" bottom="3" />
        </Key>
        <Key code="Digit4">
          <DoubleLegend top="$" bottom="4" />
        </Key>
        <Key code="Digit5">
          <DoubleLegend top="%" bottom="5" />
        </Key>
        <Key code="Digit6">
          <DoubleLegend top="^" bottom="6" />
        </Key>
        <Key code="Digit7">
          <DoubleLegend top="&" bottom="7" />
        </Key>
        <Key code="Digit8">
          <DoubleLegend top="*" bottom="8" />
        </Key>
        <Key code="Digit9">
          <DoubleLegend top="(" bottom="9" />
        </Key>
        <Key code="Digit0">
          <DoubleLegend top=")" bottom="0" />
        </Key>
        <Key code="Minus">
          <DoubleLegend top="-" bottom="_" />
        </Key>
        <Key code="Equal">
          <DoubleLegend top="+" bottom="=" />
        </Key>
        <Key
          code="Backspace"
          className="w-10"
          contentClassName="items-end justify-end pb-[2px] pr-[4px]"
        >
          <span>delete</span>
        </Key>
      </Row>

      <Row>
        <Key
          code="Tab"
          className="w-10"
          contentClassName="items-start justify-end pb-[2px] pl-[4px]"
        >
          <span>tab</span>
        </Key>
        {["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"].map(
          (letter) => (
            <Key key={letter} code={`Key${letter}`}>
              {letter}
            </Key>
          )
        )}
        <Key code="BracketLeft">
          <DoubleLegend top="{" bottom="[" />
        </Key>
        <Key code="BracketRight">
          <DoubleLegend top="}" bottom="]" />
        </Key>
        <Key code="Backslash">
          <DoubleLegend top="|" bottom="\\" />
        </Key>
      </Row>

      <Row>
        <Key
          code="CapsLock"
          className="w-[2.8rem]"
          contentClassName="items-start justify-end pb-[2px] pl-[4px]"
        >
          <span>caps lock</span>
        </Key>
        {["A", "S", "D", "F", "G", "H", "J", "K", "L"].map((letter) => (
          <Key key={letter} code={`Key${letter}`}>
            {letter}
          </Key>
        ))}
        <Key code="Semicolon">
          <DoubleLegend top=":" bottom=";" />
        </Key>
        <Key code="Quote">
          <DoubleLegend top={'"'} bottom="'" />
        </Key>
        <Key
          code="Enter"
          className="w-[2.85rem]"
          contentClassName="items-end justify-end pb-[2px] pr-[4px]"
        >
          <span>return</span>
        </Key>
      </Row>

      <Row>
        <Key
          code="ShiftLeft"
          className="w-[3.65rem]"
          contentClassName="items-start justify-end pb-[2px] pl-[4px]"
        >
          <span>shift</span>
        </Key>
        {["Z", "X", "C", "V", "B", "N", "M"].map((letter) => (
          <Key key={letter} code={`Key${letter}`}>
            {letter}
          </Key>
        ))}
        <Key code="Comma">
          <DoubleLegend top="<" bottom="," />
        </Key>
        <Key code="Period">
          <DoubleLegend top=">" bottom="." />
        </Key>
        <Key code="Slash">
          <DoubleLegend top="?" bottom="/" />
        </Key>
        <Key
          code="ShiftRight"
          className="w-[3.65rem]"
          contentClassName="items-end justify-end pb-[2px] pr-[4px]"
        >
          <span>shift</span>
        </Key>
      </Row>

      <Row>
        <ModifierKey
          code="Fn"
          containerClassName="rounded-bl-xl"
          className="rounded-bl-lg"
        >
          <span>fn</span>
          <IconWorld className="size-[6px]" />
        </ModifierKey>
        <ModifierKey code="ControlLeft">
          <IconChevronUp className="size-[6px]" />
          <span>control</span>
        </ModifierKey>
        <ModifierKey code="AltLeft">
          <OptionKey className="size-[6px]" />
          <span>option</span>
        </ModifierKey>
        <ModifierKey code="MetaLeft" className="w-8">
          <IconCommand className="size-[6px]" />
          <span>command</span>
        </ModifierKey>
        <Key code="Space" className="w-[8.2rem]" />
        <ModifierKey code="MetaRight" className="w-8">
          <IconCommand className="size-[6px]" />
          <span>command</span>
        </ModifierKey>
        <ModifierKey code="AltRight">
          <OptionKey className="size-[6px]" />
          <span>option</span>
        </ModifierKey>
        <div className="flex h-6 w-[4.9rem] items-center justify-end rounded-[4px] p-[0.5px]">
          <Key code="ArrowLeft" className="size-6">
            <IconCaretLeftFilled className="size-[6px]" />
          </Key>
          <div className="flex flex-col">
            <Key code="ArrowUp" className="h-3 w-6">
              <IconCaretUpFilled className="size-[6px]" />
            </Key>
            <Key code="ArrowDown" className="h-3 w-6">
              <IconCaretDownFilled className="size-[6px]" />
            </Key>
          </div>
          <Key
            code="ArrowRight"
            containerClassName="rounded-br-xl"
            className="size-6 rounded-br-lg"
          >
            <IconCaretRightFilled className="size-[6px]" />
          </Key>
        </div>
      </Row>
    </div>
  )
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="mb-[2px] flex w-full shrink-0 gap-[2px]">{children}</div>
}

function Key({
  className,
  children,
  contentClassName,
  containerClassName,
  code,
}: KeyDefinition) {
  const { pressedKeys, setPressed, setReleased } = useKeyboard()
  const isPressed = code ? pressedKeys.has(code) : false

  function handlePressStart() {
    if (code) {
      setPressed(code)
    }
  }

  function handlePressEnd() {
    if (code && isPressed) {
      setReleased(code)
    }
  }

  return (
    <div className={cn("rounded-[4px] p-[0.5px]", containerClassName)}>
      <button
        aria-label={code ? getKeyDisplayLabel(code) : undefined}
        type="button"
        onPointerDown={handlePressStart}
        onPointerLeave={handlePressEnd}
        onPointerUp={handlePressEnd}
        className={cn(
          "flex h-6 w-6 cursor-pointer items-center justify-center rounded-[3.5px] bg-neutral-100 text-neutral-700 shadow-[0_0_1px_0_rgb(0_0_0/50%),0_1px_1px_0_rgb(0_0_0/10%),0_1px_0_0_rgb(255_255_255)_inset] transition-transform duration-75 active:scale-[0.98]",
          isPressed &&
            "scale-[0.98] bg-neutral-100/80 shadow-[0_0_1px_0_rgb(0_0_0/50%),0_1px_1px_0_rgb(0_0_0/10%),0_1px_0_0_rgb(255_255_255/50%)_inset]",
          className
        )}
      >
        <div
          className={cn(
            "flex h-full w-full flex-col items-center justify-center text-[5px] leading-none",
            contentClassName
          )}
        >
          {children}
        </div>
      </button>
    </div>
  )
}

function ModifierKey({
  className,
  children,
  containerClassName,
  code,
}: KeyDefinition) {
  const { pressedKeys, setPressed, setReleased } = useKeyboard()
  const isPressed = code ? pressedKeys.has(code) : false

  function handlePressStart() {
    if (code) {
      setPressed(code)
    }
  }

  function handlePressEnd() {
    if (code && isPressed) {
      setReleased(code)
    }
  }

  return (
    <div className={cn("rounded-[4px] p-[0.5px]", containerClassName)}>
      <button
        aria-label={code ? getKeyDisplayLabel(code) : undefined}
        type="button"
        onPointerDown={handlePressStart}
        onPointerLeave={handlePressEnd}
        onPointerUp={handlePressEnd}
        className={cn(
          "flex h-6 w-6 cursor-pointer items-center justify-center rounded-[3.5px] bg-neutral-100 text-neutral-700 shadow-[0_0_1px_0_rgb(0_0_0/50%),0_1px_1px_0_rgb(0_0_0/10%),0_1px_0_0_rgb(255_255_255)_inset] transition-transform duration-75 active:scale-[0.98]",
          isPressed &&
            "scale-[0.98] bg-neutral-100/80 shadow-[0_0_1px_0_rgb(0_0_0/50%),0_1px_1px_0_rgb(0_0_0/10%),0_1px_0_0_rgb(255_255_255/50%)_inset]",
          className
        )}
      >
        <div className="flex size-full flex-col items-start justify-between p-1 text-[5px] leading-none">
          {children}
        </div>
      </button>
    </div>
  )
}

function OptionKey({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        height="2"
        stroke="currentColor"
        strokeWidth={2}
        width="10"
        x="18"
        y="5"
      />
      <polygon
        points="10.6,5 4,5 4,7 9.4,7 18.4,27 28,27 28,25 19.6,25"
        stroke="currentColor"
        strokeWidth={2}
      />
    </svg>
  )
}

function DoubleLegend({
  bottom,
  top,
}: {
  bottom: string
  top: string
}) {
  return (
    <>
      <span>{top}</span>
      <span>{bottom}</span>
    </>
  )
}
