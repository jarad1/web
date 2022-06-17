import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "./Loading";
import { ReturnImage } from "./Steps/testeReturm";

// terceira etapa: chamados os props da função, enviados para pagina anterior, classificando o tipo de dado ele ira receber
interface  ScreenShotButtonProps {
  screenshot: string | null;
  onScreenshotTook: (screenshot: string | null) => void;
}

// etapa 4: enviamos a funcão onScreenshotTook como propriedade da função chamada na tela anterior, e assim enviamos a informação requerida para a outra tela 
  export function ScreenshotButton({screenshot,onScreenshotTook}: ScreenShotButtonProps) {
    const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

    async function handleTakeScreenshot() {
      //para que a imagem mude camera para loading
      setIsTakingScreenshot(true);

      const canvas = await html2canvas(document.querySelector('html')!);
      const base64image = canvas.toDataURL('image/png');

      // envio da url da imagem para o FeedbackContentStep
      onScreenshotTook( base64image);
     
      setIsTakingScreenshot(false); 
    }
    //vamos pegar o parametro que setamos
    if (screenshot) {
      return (
        <button
        type="button"
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        onClick={()=> onScreenshotTook(null)}
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom',
          backgroundSize: 180,
        }}>
          <Trash weight="fill" />
        </button>
      )
    }

    return (
      <button 
        type="button"
        className="p-2 bg-zinc-800 rounded-[4px] border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500" 
        onClick={handleTakeScreenshot}>
          {! isTakingScreenshot ?( <Camera className="w-6 h-6 animate-pulse"/> ):( <Loading />) }
              
      </button>
    )
  }

