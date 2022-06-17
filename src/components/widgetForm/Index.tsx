import { CloseButton } from "../CloseButton";

import  BugImageUrl  from "../../assets/bug.svg";
import  ideaImageUrl  from "../../assets/idea.svg";
import  thoughtImageUrl  from "../../assets/thought.svg";
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

export const feedbackTypes= {
  BUG: {
    title: 'Problema',
    image: {
      source: BugImageUrl,
      alt: 'Imagem de um inseto'
    }
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImageUrl,
      alt: 'Imagem de uma lampada'
    }
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImageUrl,
      alt: 'Imagem de uma nuvem de pensamento'
    }
  },
};

export type FeedbackType = keyof typeof feedbackTypes

export function WidgetForm() {

  const [feedbackType,setFeedbackType ] = useState<FeedbackType | null>(null)
  const [feedbackSent, setFeedbackSent] = useState(false)

// essa função transforma novamente o typo de feedback em null, que no caso é o componente incial
  function handleRestartFeedback() {
    setFeedbackSent(false)
    setFeedbackType(null);
  }
// Na linha {!feedbackType?(item1):(item2)} se o feedbackType for nulo, no caso se não tiver nenhum selecionado, vai mostrar o item1, caso um for selecionado sera mostrado o item2 
  return(
    <div className="bg-zinc-900 p-4 lg:w-max-[336px] lg:h-[280px] rounded-2xl mb-4 flex-col text-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
    { feedbackSent ? (
      <FeedbackSuccessStep onFeedbackRestartRequested={handleRestartFeedback} />
    ): (
      <>
        { !feedbackType ? (
          <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType}/>
        ) : (
          <FeedbackContentStep 
            feedbackType={feedbackType}
           onFeedbackRestartRequested={handleRestartFeedback}
            onFeedbackSent={() => setFeedbackSent(true)}
          />
        )}
      </>
    ) }
    
    
    
    
    <footer className="text-xs pt-6 text-neutral-400 ">
      Feito por <a className="underline underline-offset-2 focus:text-neutral-300" href="http://github.com/jarad1"> JaradLima</a>
    </footer>
    </div>
  )
}