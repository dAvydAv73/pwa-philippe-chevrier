import Image from "next/image";
import { useTranslations } from 'next-intl';
import LogoIcon from "../../public/img/LesAviateurs_logo_white.svg";

export const Cover = ({ children, background }) => {
  const t = useTranslations('Home.Cover');
  return (
    <div className="h-screen text-white relative min-h-[400px] max-h-[900px] flex items-center  flex-col	homeCover pb-20">
      
      <a href='/' title="Les Aviateurs par Philippe Chevrier - Home" className="text-white logoLink animate-slideLeft">
        <Image 
            priority
            src={LogoIcon}
            height={180}
            width={520}
            alt="Les Aviateurs par Philippe Chevrier"
            className="logoLinkImg w-[80vw] max-w-[520px]"
          />
      </a>
      
      {!!background && (
        <Image
          alt="Cover"
          src={background}
          fill
          priority="low"
          className="mix-blend-soft-light object-cover"
        />
      )}
      
      <div className="max-w-5xl z-10 drop-shadow-md mt-10 animate-slideRight sm:mt-0">{children}</div>
    </div>
  );
};

/*   <div className="max-w-5xl z-10">{t('Title')}</div>    */