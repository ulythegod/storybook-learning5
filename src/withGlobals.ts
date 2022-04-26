import type { DecoratorFunction } from "@storybook/addons";
import { useEffect, useGlobals, useMemo } from "@storybook/addons";

import { clearStyles, addOutlineStyles } from './helpers';
import outlineCSS from './outlineCSS';

export const withGlobals: DecoratorFunction = (StoryFn, context) => {
  const [{ outlineActive }, updateGlobals] = useGlobals();
  // Is the addon being used in the docs panel
  const isInDocs = context.viewMode === "docs";

  const outlineStyles = useMemo(() => {
    const selector = isInDocs ? `#anchor--${context.id} .docs-story` : '.sb-show-main';

    return outlineCSS(selector);
  }, [context.id]);

  useEffect(() => {
    const selectorId = isInDocs ? `addon-outline-docs-${context.id}` : `addon-outline`;

    if (!outlineActive) {
      clearStyles(selectorId);
      return;
    }

    addOutlineStyles(selectorId, outlineStyles);

    return () => {
      clearStyles(selectorId);
    };
  }, [outlineActive, outlineStyles, context.id]);

  return StoryFn();
};

function displayToolState(selector: string, state: any) {
  const rootElement = document.querySelector(selector);
  let preElement = rootElement.querySelector("pre");

  if (!preElement) {
    preElement = document.createElement("pre");
    preElement.style.setProperty("margin-top", "2rem");
    preElement.style.setProperty("padding", "1rem");
    preElement.style.setProperty("background-color", "#eee");
    preElement.style.setProperty("border-radius", "3px");
    preElement.style.setProperty("max-width", "600px");
    rootElement.appendChild(preElement);
  }

  preElement.innerText = `This snippet is injected by the withGlobals decorator.
It updates as the user interacts with the ⚡ tool in the toolbar above.

${JSON.stringify(state, null, 2)}
`;
}
