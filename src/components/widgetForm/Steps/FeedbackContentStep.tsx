import { ArrowLeft, Camera } from "phosphor-react";
import { FeedbackType, feedbackTypes } from "../Index";
import { CloseButton } from "../../CloseButton";
import { ScreenshotButton } from "../ScreenShotButton";
import { ReturnImage } from "./testeReturm";
import { FormEvent, useState } from "react";
import { api } from "../../../lib/api";
import { Loading } from "../Loading";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}


export function FeedbackContentStep({
  feedbackType, 
  onFeedbackRestartRequested,
  onFeedbackSent }: FeedbackContentStepProps) {

  //1.para recuperar os dados primeiro criamos uma const com os parametros podendo ser null no inicio e string depois de rodar o parametro daqui vai para o screenshotButton, aqui sabemos se temos uma foto tirada ou não. 
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment,setComment ] = useState('');
  const [isSendingFeedback,setIsSendingFeedback] = useState(false);

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();

    setIsSendingFeedback(true);

    await api.post('/feedbacks',{
      type: feedbackType,
      comment,
      screenshot,
    });
    setIsSendingFeedback(false);
    onFeedbackSent();
  }

  return (
    <>
      <header className=" flex lg:max-w-[336px] md:w-full justify-between flex-wrap" >
        <div className=" flex-1 w-4 ">
          <button type="button" className=" top-5 left-5 absolute text-zinc-400 hover:text-zinc-100 focus:text-zinc-100 "
          onClick={onFeedbackRestartRequested}>
            <ArrowLeft weight="bold" className="w-4 h-4" />
          </button>
        </div>
        <div className=" flex-2 text-center inline-flex ">
          <span className="text-xl flex leading-6 gap-2">
            <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6" />{feedbackTypeInfo.title}
          </span>
        </div>
        <div className=" flex-1 text-center ">
          <CloseButton/>
        </div>
      </header>

      
        <form onSubmit={handleSubmitFeedback} className="mt-4 lg:max-w-[336px]  md:w-full " >
          <textarea className="min-w-[304px] w-full md:mx-auto min-h-[108px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-1 focus:ring-brand-500 focus:outline-none  scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin  "
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={event => setComment(event.target.value)}/>

          <footer className="flex gap-2 mt-2 " >
            <ScreenshotButton 
            //segundo passo: criar a função para chamando o item criado na primeira etapa e daqui vai o ScreenshotButton-> interface.
             screenshot={screenshot}
             onScreenshotTook={setScreenshot}
            />

            <button
            type="submit"
            disabled={comment.length ===0 || isSendingFeedback}
            className="p-2 bg-brand-500 rounded-[4px] border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500 " >
              {isSendingFeedback? <Loading /> : 'Enviar feedback'}
            </button>
          </footer>
        </form>
     

     
  </>
  )
}

