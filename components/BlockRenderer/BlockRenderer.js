import { CallToActionButton } from "../CallToActionButton";
import { Column } from "../Column";
import { Columns } from "../Columns";
import { Cover } from "../Cover";
import { FormspreeForm } from "../FormspreeForm";
import { Gallery } from "../Gallery";
import { Heading } from "../Heading";
import { Paragraph } from "../Paragraph";
import { TickItem } from "../TickItem";
import Image from "next/image";
import { theme } from "../../theme";
import { ListItem } from "../ListItem/ListItem";
import { ListItemContent } from "../ListItemContent/ListItemContent";
import { Images2Block } from "../Images2Block/Images2Block";


export const BlockRenderer = ({ blocks }) => {
  return blocks.map((block, index) => {
    //console.log('Block:', JSON.stringify(block, null, 2)); // Pour le débogage
    // Vérification de sécurité pour block.attributes
    const attributes = block.attributes || {};
    const customClasses = typeof attributes.classesTailwind === 'string' 
      ? attributes.classesTailwind 
      : '';

    //console.log(`Custom classes for block ${index}:`, customClasses); // Log pour le débogage

    switch (block.name) {
      
      case "acf/tickitem": {
        return (
          <TickItem key={block.id}>
            <BlockRenderer blocks={block.innerBlocks} />
          </TickItem>
        );
      }
      case "core/gallery": {
        return (
          <Gallery
            key={block.id}
            columns={block.attributes.columns || 3}
            cropImages={block.attributes.imageCrop}
            items={block.innerBlocks}
          />
        );
      }
      case "acf/formspreeform": {
        return (
          <FormspreeForm
            key={block.id}
            formId={block.attributes.data.form_id}
          />
        );
      }
      case "acf/cta-button": {
        //console.log(block.attributes.data.destination || "/")

        return (
          <CallToActionButton
            key={block.id}
            buttonLabel={block.attributes.data.label}
            destination={block.attributes.data.destination || "/"}
            align={block.attributes.data.align}
            btnclass={block.attributes.data.invert}
          />
        );
      }
      case "core/paragraph": {
        return (
          <Paragraph
            key={block.id}
            textAlign={block.attributes.textAlign}
            content={block.attributes.content}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color?.text
            }
          />
        );
      }
      case "core/post-title":
      case "core/heading": {
        return (
          <Heading
            key={block.id}
            level={block.attributes.level}
            content={block.attributes.content}
            textAlign={block.attributes.textAlign}
            textColor={
              theme[block.attributes.textColor] ||
              block.attributes.style?.color?.text
            }
          />
        );
      }
      case "core/cover": {
        return (
          <Cover key={block.id} background={block.attributes.url}>
            <BlockRenderer blocks={block.innerBlocks} />
          </Cover>
        );
      }
      case "core/columns": {
       
        return (
          <Columns
            key={block.id || `column-${index}`}
            isStackedOnMobile={attributes.isStackedOnMobile}
            customClasses={customClasses}
            textColor={
              theme[attributes.textColor] ||
              attributes.style?.color?.text
            }
            backgroundColor={
              theme[attributes.backgroundColor] ||
              attributes.style?.color?.background
            }
          >
            {block.innerBlocks && block.innerBlocks.map((innerBlock, innerIndex) => (
              <BlockRenderer
                key={innerBlock.id || `inner-block-${innerIndex}`}
                blocks={[{...innerBlock, index: innerIndex}]}
              />
            ))}
          </Columns>
        );
      }
      case "core/column": {
        
        return (
          <Column
            key={block.id}
            width={block.attributes?.width || ''}
            customClasses={customClasses}
            textColor={
              theme[block.attributes?.textColor || ''] ||
              block.attributes?.style?.color?.text || ''
            }
            backgroundColor={
              theme[block.attributes?.backgroundColor || ''] ||
              block.attributes?.style?.color?.background| ''
            }
            index={block.index} // Ajoutez cette ligne pour les animations
          >
            <BlockRenderer blocks={block.innerBlocks} />
          </Column>
        );
      }
      case "core/group":
      case "core/block": {
        return <BlockRenderer key={block.id} blocks={block.innerBlocks} />;
      }
      case "core/image": {
        return (
          <Image
            key={block.id}
            src={block.attributes.url}
            height={block.attributes.height}
            width={block.attributes.width}
            alt={block.attributes.alt || ""}
          />
        );
      }
      case "core/list": {
        return (
          <div key={block.id} className="space-y-2">
            {block.innerBlocks && block.innerBlocks.map((innerBlock, innerIndex) => (
              <BlockRenderer
                key={innerBlock.id || `inner-block-${innerIndex}`}
                blocks={[{...innerBlock, index: innerIndex}]}
              />
            ))}
          </div>
        );
      }
      case "core/list-item": {
        return (
          <ListItem key={block.id} index={block.index}>
            <ListItemContent content={block.attributes.content} />
          </ListItem>
        );
      }
      case "acf/contact-div": {
        //console.log("acf/contact-div block:", block);
    
        const blockId = block.attributes.data.id || ""; // Récupère l'ID du bloc
    
        return (
          <div
            key={block.id}
            id={blockId} // Assigne l'ID récupéré depuis ACF
            className={block.attributes.data.custom_class || ""} // Si vous avez des classes personnalisées
          >
            {/* Si vous avez un contenu spécifique à injecter, il peut être ajouté ici */}
          </div>
        );
    }
    case "acf/images2block": {
      // On vérifie si data existe dans les attributes
      const data = block.attributes.data || {};
      
      // On prépare les objets d'image
      const image1 = data.image1 ? {
        url: data.image1.url || '',
        alt: data.image1.alt || '',
        width: data.image1.width || 800,
        height: data.image1.height || 600
      } : null;
    
      const image2 = data.image2 ? {
        url: data.image2.url || '',
        alt: data.image2.alt || '',
        width: data.image2.width || 800,
        height: data.image2.height || 600
      } : null;
    
      return (
        <Images2Block
          key={block.id}
          image1={image1}
          image2={image2}
        />
      );
    }
      default: {
        console.log(`UNKNOWN BLOCK TYPE at index ${index}:`, block.name);
        return (
          <div key={block.id || `unknown-block-${index}`}>
            Unknown block type: {block.name}
          </div>
        );
      }
    }
  });
};
