import { Entity } from "../../ecs/classes/Entity";
import { getComponent } from "../../ecs/functions/EntityFunctions";
import { CommonInteractiveData } from "../../templates/interactive/interfaces/CommonInteractiveData";
import { Object3DComponent } from '../../common/components/Object3DComponent';
import AudioSource from "../classes/AudioSource";


export const InteractiveSchema = {
    infoBox: (objArgs, entity: Entity): CommonInteractiveData => {
        return {
            action: 'infoBox',
            payload: {
                name: objArgs.payloadName,
                url: objArgs.payloadUrl,
                buyUrl: objArgs.payloadBuyUrl,
                learnMoreUrl: objArgs.payloadLearnMoreUrl,
                modelUrl: objArgs.payloadModelUrl,
                htmlContent: objArgs.payloadHtmlContent,
            },
            interactionText: objArgs.interactionText
        };
    },
    link: (objArgs, entity: Entity): CommonInteractiveData => {
        return {
            action: 'link',
            payload: {
                name: objArgs.payloadName,
                url: objArgs.payloadUrl,
            },
            interactionText: objArgs.interactionText
        };
    }
};