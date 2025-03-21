import { useCallback, useEffect, useState } from "react";

interface Answer {
  prompt: string;
  response?: string;
  createdAt: string;
  loading: boolean;
}

type UsePromptingHook = (args: {
  prompt: string;
  onPrompt: () => void;
  promptDelay: number;
}) => {
  answers: Answer[];
  willPromptIn: number; // seconds
  togglePaused: () => void;
  isPaused: boolean;
};

let intervalHandler: NodeJS.Timeout | null;
let timeoutHandler: NodeJS.Timeout | null;

const usePrompting: UsePromptingHook = ({
  prompt: _prompt,
  onPrompt,
  promptDelay,
}) => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [willPromptIn, setWillPromptIn] = useState(-1);
  const [prompt, setPrompt] = useState(_prompt || "");
  const [paused, setPaused] = useState(false);

  const togglePaused = () => setPaused(!paused);

  useEffect(() => {
    if (_prompt === prompt) return;
    setPrompt(_prompt);
  }, [_prompt, prompt]);

  const submitPrompt = useCallback((p: string, onPrompt: () => void) => {
    // TODO make request to LLM
    if (intervalHandler) {
      clearInterval(intervalHandler);
      intervalHandler = null;
      setWillPromptIn(-1);
    }
    setAnswers((prev) => [
      ...prev,
      {
        createdAt: new Date().toISOString(),
        prompt: p,
        loading: true,
      },
    ]);
    fetch("/ask-coach", {
      method: "POST",
      body: JSON.stringify({ text: p }),
    })
      .then((res) => res.json())
      .then((res) => {
        setAnswers((prev) => {
          const last = prev.pop();
          return [
            ...prev,
            {
              ...(last as Answer),
              response: res.message as string,
              loading: false,
            },
          ];
        });
      });
    onPrompt();
  }, []);

  useEffect(() => {
    if (!prompt) return;

    setWillPromptIn(promptDelay);

    if (intervalHandler) clearInterval(intervalHandler);
    intervalHandler = setInterval(() => {
      setWillPromptIn((prev) => prev - 1000);
    }, 1000);

    if (timeoutHandler) clearTimeout(timeoutHandler);
    timeoutHandler = setTimeout(() => {
      submitPrompt(prompt, onPrompt);
    }, promptDelay);
  }, [prompt]);

  useEffect(() => {
    if (!paused && prompt) {
      // restart timeouts
      setWillPromptIn(promptDelay);
      if (!intervalHandler)
        intervalHandler = setInterval(() => {
          setWillPromptIn((prev) => prev - 1000);
        }, 1000);
      if (!timeoutHandler)
        timeoutHandler = setTimeout(() => {
          submitPrompt(prompt, onPrompt);
        }, promptDelay);
    } else {
      // kill timeouts
      if (intervalHandler) clearInterval(intervalHandler);
      if (timeoutHandler) clearTimeout(timeoutHandler);
      intervalHandler = null;
      timeoutHandler = null;
    }
  }, [paused, prompt]);

  return {
    answers,
    willPromptIn,
    togglePaused,
    isPaused: paused,
  };
};

export default usePrompting;
