import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";

interface Answer {
  prompt: string;
  response: string;
  createdAt: string;
}

type UsePromptingHook = (args: {
  prompt: string;
  onPrompt: () => void;
  promptDelay: number;
}) => {
  answers: Answer[];
  willPromptIn: number; // seconds
};

let intervalHandler: NodeJS.Timeout | null;

const usePrompting: UsePromptingHook = ({
  prompt: _prompt,
  onPrompt,
  promptDelay,
}) => {
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [willPromptIn, setWillPromptIn] = useState(-1);
  const [prompt, setPrompt] = useState(_prompt || "");

  useEffect(() => {
    if (_prompt === prompt) return;
    setPrompt(_prompt);
  }, [_prompt]);

  const submitPrompt = useCallback(
    debounce((p, onPrompt) => {
      console.log("5 sec elapsed - submitting prompt");
      // TODO make request to LLM
      if (intervalHandler) {
        clearInterval(intervalHandler);
        intervalHandler = null;
        setWillPromptIn(-1);
      }
      setAnswers([
        ...answers,
        { prompt, response: "not sure", createdAt: new Date().toISOString() },
      ]);
      onPrompt();
    }, promptDelay),
    []
  );

  useEffect(() => {
    if (!prompt) return;
    console.log("useEffect triggered", {
      prompt,
    });
    setWillPromptIn(promptDelay);
    if (intervalHandler) clearInterval(intervalHandler);
    intervalHandler = setInterval(() => {
      setWillPromptIn((prev) => prev - 1000);
    }, 1000);
    submitPrompt(prompt, onPrompt);
  }, [prompt, submitPrompt]);

  return {
    answers: [],
    willPromptIn,
  };
};

export default usePrompting;
