import { Behavior } from '../../common/interfaces/Behavior';
import { Entity } from '../../ecs/classes/Entity';
import { TouchInputs } from "../enums/TouchInputs";
import { InputType } from "../enums/InputType";
import { LifecycleValue } from "../../common/enums/LifecycleValue";
import { getComponent } from "../../ecs/functions/EntityFunctions";
import { Input } from "../components/Input";
import { DefaultInput } from '../../templates/shared/DefaultInput';
import { normalizeMouseCoordinates } from '../../common/functions/normalizeMouseCoordinates';
import { BinaryValue } from '../../common/enums/BinaryValue';

/**
 * Touch move
 * 
 * @param {Entity} entity The entity
 * @param args is argument object
 */
export const handleTouchMove: Behavior = (entity: Entity, args: { event: TouchEvent }): void => {
  const input = getComponent(entity, Input);

  const normalizedPosition = normalizeMouseCoordinates(args.event.targetTouches[0].clientX, args.event.targetTouches[0].clientY, window.innerWidth, window.innerHeight);
  const touchPosition: [number, number] = [normalizedPosition.x, normalizedPosition.y];
  const touchPrevInput = input.prevData.get(DefaultInput.SCREENXY);
  const normalizedPrevPosition = normalizeMouseCoordinates(touchPrevInput.value[0], touchPrevInput.value[1], window.innerWidth, window.innerHeight);
  const touchPrevPosition: [number, number] = [ normalizedPrevPosition.x, normalizedPrevPosition.y ];
  const touchMovementPositionX = (touchPosition[0] - touchPrevPosition[0]);
  const touchMovementPositionY = (touchPosition[1] - touchPrevPosition[1]);
  const touchMovement: [number, number] = [ touchMovementPositionX, touchMovementPositionY ];

  const mappedPositionInput = input.schema.touchInputMap?.axes[TouchInputs.Touch1Position];
  const mappedMovementInput = input.schema.touchInputMap?.axes[TouchInputs.Touch1Movement];

  if (!mappedPositionInput) {
    return;
  }

  if (mappedPositionInput) {
    if (!input.data.has(mappedPositionInput)) {
      input.data.set(mappedPositionInput, {
        type: InputType.TWODIM,
        value: touchPosition,
        lifecycleState: LifecycleValue.STARTED
      });
    } else {
      input.data.set(mappedPositionInput, {
        type: InputType.TWODIM,
        value: touchPosition,
        lifecycleState: LifecycleValue.CHANGED
      });
    }
  }
  
  if (mappedMovementInput) {
    if (!input.data.has(mappedMovementInput)) {
      input.data.set(mappedMovementInput, {
        type: InputType.TWODIM,
        value: touchMovement,
        lifecycleState: LifecycleValue.STARTED
      });
    } else {
      input.data.set(mappedMovementInput, {
        type: InputType.TWODIM,
        value: touchMovement,
        lifecycleState: LifecycleValue.CHANGED
      });
    }
  }
};