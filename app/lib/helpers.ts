import { ContentItem, STypeKeys } from "./definitions";
import * as _ from "lodash";

export const fetcher = (url: string, init?: RequestInit) =>
  fetch(url, init).then((res) => res.json());

//************************************************************************ */
//***************************************************************Strapi */ */
//************************************************************************ */
// Helper function for getting image properties
export const safeGetImageProperty = (
  item: ContentItem,
  property: STypeKeys,
  defaultValue: any = undefined
) => {
  // Building the path to the property using enum STypeKeys
  const path = `${STypeKeys.IMAGE}.${property}`;
  // Use _.get to securely access a property with the ability to specify a default value
  return _.get(item, path, defaultValue);
};

// Helper function to get text from first child element
export const safeGetChildrenProperty = (
  item: ContentItem,
  property: STypeKeys,
  defaultValue: string = "Default Text"
) => {
  const path = `${STypeKeys.CHILDREN}.0.${property}`;
  return _.get(item, path, defaultValue);
};

export const safeGetChildren = (item: ContentItem, defaultValue: []) => {
  return _.get(item, STypeKeys.CHILDREN, defaultValue);
};

/**
 * Extracts texts from the first child elements of type "text" in each "list-item"
 * contained within the `children` property of a `ContentItem` object. If a "text"
 * child element is missing, it returns a specified default value for each "list-item".
 *
 * @param {ContentItem} item - The `ContentItem` object representing a content element.
 * Expected to be of type "list" and contain nested elements within its `children` property.
 * @param {string} [defaultValue="Default Text"] - The default value for the text
 * if the "text" child element is missing. Defaults to "Default Text".
 * @returns {string[]} An array of strings containing texts from the first "text"
 * child elements of each "list-item" in the `children` of the `ContentItem` object.
 * If a "list-item" lacks a "text" child element, the default value is used in the array.
 *
 * @example
 * const listItemWithText: ContentItem = {
 *   type: "list",
 *   children: [
 *     {
 *       type: "list-item",
 *       children: [{ type: "text", text: "First list item" }]
 *     },
 *     {
 *       type: "list-item",
 *       children: [{ type: "text", text: "Second list item" }]
 *     }
 *   ]
 * };
 *
 * const texts = safeGetListItemsTexts(listItemWithText);
 * console.log(texts); // Output: ["First list item", "Second list item"]
 */

export const safeGetListItemsTexts = (
  item: ContentItem,
  defaultValue: string = "Default Text"
): string[] => {
  const children = safeGetChildren(item, []);
  return _.map(children, (listItem) => {
    const text = _.get(
      listItem,
      `${STypeKeys.CHILDREN}.0.${STypeKeys.TEXT}`,
      defaultValue
    );
    return text;
  });
};
